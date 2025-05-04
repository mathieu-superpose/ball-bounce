uniform vec3 uLightPosition;

varying vec3 vWorldPosition; // Receive world position from vertex shader
varying vec3 vNormal; // Receive world normal from vertex shader

void main() {
    vec3 color = vec3(0.76, 0.73, 0.25); // Base color
    vec3 lightColor = vec3(1.0, 1.0, 1.0); // Light color

    // Calculate light direction (from surface point to light source)
    vec3 lightDirection = normalize(uLightPosition - vWorldPosition);

    // Normalize the interpolated normal vector
    vec3 normal = normalize(vNormal);

    // Calculate diffuse lighting factor (Lambertian)
    // Ensure it's not negative
    float diffuseFactor = max(dot(normal, lightDirection), 0.0);

    // Calculate final color with diffuse lighting
    vec3 diffuseColor = color * lightColor * diffuseFactor;

    // Add a small amount of ambient light so it's not completely black in shadow
    vec3 ambientColor = 0.1 + color * 0.25;

    vec3 finalColor = ambientColor + diffuseColor;

    gl_FragColor = vec4(finalColor, 1.0);
}