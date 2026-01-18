from humanmouse import HumanMouseController
import random
import time

# --- Setup human-like mouse ---
mouse = HumanMouseController(
    num_points=350,        # smooth curves
    jitter_amplitude=0.4,  # small hand shakes
    speed_factor=1.0       # base speed
)

# --- Major targets ---
major_targets = [(600, 400), (900, 500), (820, 480)]

# --- Function to generate curved path ---
def generate_curve(start, end, n_points=5, chaos=15):
    points = []
    for _ in range(n_points):
        t = random.random()
        x = int(start[0] + (end[0] - start[0]) * t + random.randint(-chaos, chaos))
        y = int(start[1] + (end[1] - start[1]) * t + random.randint(-chaos, chaos))
        points.append((x, y))
    points.append(end)
    return points

# --- Move the mouse and click ---
current_pos = (random.randint(100, 300), random.randint(100, 300))

for target in major_targets:
    curve_points = generate_curve(current_pos, target, n_points=random.randint(5, 8), chaos=15)
    
    for point in curve_points[:-1]:  # all intermediate points
        mouse.set_speed(random.uniform(0.8, 2.0))
        mouse.move_to(point)
        time.sleep(random.uniform(0.01, 0.05))
    
    # Final point → move + click
    final_point = curve_points[-1]
    mouse.set_speed(random.uniform(0.8, 2.0))
    mouse.move_to(final_point)
    time.sleep(random.uniform(0.05, 0.2))  # tiny pause before click
    mouse.click_at(final_point)  # LEFT CLICK

    current_pos = target  # update for next iteration
