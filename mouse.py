from humanmouse import HumanMouseController
import random
import time
import pyautogui

# --- Setup human-like mouse ---
mouse = HumanMouseController(
    num_points=400,        # smooth curves for large movements
    jitter_amplitude=0.3,  # subtle hand shakes
    speed_factor=1.0       # base speed
)

# --- Parameters ---
SCREEN_WIDTH, SCREEN_HEIGHT = pyautogui.size()
MIN_DIST = 50      # minimum movement distance
MAX_DIST = 500     # maximum movement distance
CLICK_INTERVAL = (5, 10)  # seconds between clicks
PAUSE_BETWEEN_MOVES = (0.3, 1.0)  # pause at each micro-position
CHAOS = 25         # randomness for curves
SCROLL_CHANCE = 0.6  # chance to scroll during a move
SCROLL_AMOUNT = (5, 20)  # small scroll distance in pixels

# --- Generate smooth curved path ---
def generate_curve(start, end, n_points=5, chaos=CHAOS):
    points = []
    for _ in range(n_points):
        t = random.random()
        x = int(start[0] + (end[0] - start[0]) * t + random.randint(-chaos, chaos))
        y = int(start[1] + (end[1] - start[1]) * t + random.randint(-chaos, chaos))
        x = max(0, min(SCREEN_WIDTH-1, x))
        y = max(0, min(SCREEN_HEIGHT-1, y))
        points.append((x, y))
    points.append(end)
    return points

# --- Generate next random target for larger movement ---
def random_target(current):
    while True:
        dx = random.randint(MIN_DIST, MAX_DIST) * random.choice([-1, 1])
        dy = random.randint(MIN_DIST, MAX_DIST) * random.choice([-1, 1])
        x = current[0] + dx
        y = current[1] + dy
        x = max(0, min(SCREEN_WIDTH-1, x))
        y = max(0, min(SCREEN_HEIGHT-1, y))
        dist = ((x-current[0])**2 + (y-current[1])**2)**0.5
        if MIN_DIST <= dist <= MAX_DIST:
            return (x, y)

# --- Main browsing loop ---
current_pos = pyautogui.position()
last_click = time.time()

print("Starting human-like browsing with micro-scrolls. Press Ctrl+C to stop.")

try:
    while True:
        # pick next large random target
        next_pos = random_target(current_pos)
        curve_points = generate_curve(current_pos, next_pos, n_points=random.randint(5, 12), chaos=CHAOS)
        
        for point in curve_points[:-1]:
            mouse.set_speed(random.uniform(0.8, 2.0))
            mouse.move_to(point)
            
            # Micro-scroll sometimes
            if random.random() < SCROLL_CHANCE:
                scroll_pixels = random.randint(*SCROLL_AMOUNT)
                direction = random.choice([-1, 1])
                pyautogui.scroll(scroll_pixels * direction)
            
            time.sleep(random.uniform(0.01, 0.06))
        
        # final point
        final_point = curve_points[-1]
        mouse.set_speed(random.uniform(0.8, 2.0))
        mouse.move_to(final_point)
        time.sleep(random.uniform(*PAUSE_BETWEEN_MOVES))
        current_pos = final_point
        
        # occasional click every 5–10 seconds
        if time.time() - last_click >= random.uniform(*CLICK_INTERVAL):
            mouse.click_at(current_pos)
            last_click = time.time()

except KeyboardInterrupt:
    print("Browsing simulation stopped by user.")
