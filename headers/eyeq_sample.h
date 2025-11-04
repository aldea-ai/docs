#ifndef EYEQ_SAMPLE_H
#define EYEQ_SAMPLE_H

/**
 * Initializes the EyeQ engine.
 * @param license_key The product license key.
 * @return 0 on success, non-zero on error.
 */
int eyeq_init(const char* license_key);

/**
 * Applies automatic photo correction to an RGBA buffer.
 * @param input   Pointer to RGBA buffer.
 * @param width   Width in pixels.
 * @param height  Height in pixels.
 * @return 0 on success, non-zero on error.
 */
int eyeq_autocorrect(unsigned char* input, int width, int height);

/**
 * Releases all resources and shuts down the engine.
 */
void eyeq_shutdown(void);

#endif 
