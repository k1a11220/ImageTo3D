import json
import re
from OCC.Core.STEPControl import STEPControl_Reader
from OCC.Core.Interface import Interface_Static_SetCVal

def parse_step_file(step_filename):
    # Initialize the STEP reader
    step_reader = STEPControl_Reader()

    # Read the STEP file
    status = step_reader.ReadFile(step_filename)

    if status != IFSelect_RetDone:
        raise Exception("Error reading STEP file")

    # Transfer all roots (translates all the read data to the Open CASCADE model)
    step_reader.TransferRoots()

    # Initialize variables to store extracted NURBS data
    nurbs_curves = []
    nurbs_surfaces = []

    # Function to parse B_SPLINE_CURVE_WITH_KNOTS
    def parse_bspline_curve(data):
        pattern_bspline_curve = re.compile(r'#(\d+) = B_SPLINE_CURVE_WITH_KNOTS\((.*?)\);', re.DOTALL)
        pattern_cartesian_point = re.compile(r'#(\d+) = CARTESIAN_POINT\((.*?)\);')
        points = {}

        # Extract points
        for match in pattern_cartesian_point.finditer(data):
            id, pdata = match.groups()
            coordinates = re.findall(r'[-+]?[0-9]*\.?[0-9]+', pdata)
            points[id] = list(map(float, coordinates))

        # Extract B-Spline curves
        for match in pattern_bspline_curve.finditer(data):
            id, cdata = match.groups()
            segments = cdata.split(',')

            degree = int(segments[1])
            control_points_ids = re.findall(r'#(\d+)', segments[2])
            control_points = [points[pid] for pid in control_points_ids]
            knot_vector = list(map(float, re.findall(r'[-+]?[0-9]*\.?[0-9]+', segments[5])))
            multiplicities = list(map(int, re.findall(r'\d+', segments[6])))

            nurbs_curve = {
                'type': 'BSplineCurve',
                'degree': degree,
                'control_points': control_points,
                'knot_vector': knot_vector,
                'multiplicities': multiplicities
            }
            nurbs_curves.append(nurbs_curve)

    # Load the STEP file data as text for regex parsing
    with open(step_filename, 'r') as file:
        step_data = file.read()

    parse_bspline_curve(step_data)

    # Return extracted NURBS data as JSON
    return json.dumps({
        'nurbs_curves': nurbs_curves,
        'nurbs_surfaces': nurbs_surfaces
    }, indent=4)

# Usage example
step_filename = 'example_with_nurbs.step'
nurbs_json = parse_step_file(step_filename)
print(nurbs_json)
