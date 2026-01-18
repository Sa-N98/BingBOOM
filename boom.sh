#!/bin/bash

browsers=(
    "/opt/firefox-nightly/firefox"
    "brave-browser"
    "/opt/firefox-dev/firefox"
    "/opt/firefox-beta/firefox"
    "brave-browser-nightly"
    "brave-browser-beta"
    "chromium"
    "firefox"
)

# Shuffle browsers
mapfile -t browsers < <(printf "%s\n" "${browsers[@]}" | shuf)

for browser in "${browsers[@]}"; do
    echo "Launching $browser..."
    $browser https://sa-n98.github.io/BingBOOM/ &

    random_sleep_1=$((RANDOM % 2727 + 1527))
    sleep "$random_sleep_1"

    if [[ "$browser" == brave-browser* ]]; then
        pkill -9 -f "brave"
    else
        pkill -9 -f "$browser"
    fi

    random_sleep_2=$((RANDOM % 627 + 927))
    sleep "$random_sleep_2"
done

