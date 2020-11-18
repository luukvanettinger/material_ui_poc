export function getRiffSVGName(name, key, octave = 0) {
    const suffix = !octave ? `` : `_${octave}`;
    return name
        .replace("_c.", `_${key}${suffix}.`)
        .replace("/120/", "/svg/")
        .replace(".png", ".svg");
}