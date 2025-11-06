#ifndef LOGGER_H
#define LOGGER_H
#ifdef __cplusplus
extern "C" {
#endif

/**
 * @file logger.h
 * @brief Pluggable logging interface.
 */

/**
 * @brief Sets log level threshold.
 * @param level One of: 0=ERROR, 1=WARN, 2=INFO, 3=DEBUG, 4=TRACE.
 * @return 0 on success; -1 invalid level.
 */
int log_set_level(int level);

/**
 * @brief Logs a formatted message at a given level.
 * @param level Log level.
 * @param message Null-terminated message (no formatting).
 * @return 0 on success.
 */
int log_write(int level, const char* message);

/**
 * @brief Enables or disables timestamps in log output.
 * @param enabled 1 to enable; 0 to disable.
 * @return 0 on success.
 */
int log_enable_timestamps(int enabled);

/**
 * @brief Sets a custom log sink (stderr, file, etc).
 * @param sink_name Name identifier for sink (e.g., "stderr","file").
 * @return 0 on success; -1 not supported.
 */
int log_set_sink(const char* sink_name);

#ifdef __cplusplus
}
#endif
#endif /* LOGGER_H */
