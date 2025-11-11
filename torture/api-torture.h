/**
 * @file api_torture.h
 * @brief Torture header to exercise the MDX generator.
 *
 * This file intentionally includes tricky constructs:
 * - Prototypes and inline definitions
 * - Function-like and constant macros
 * - Named/anonymous enums, structs, unions
 * - Callback typedefs
 * - Doxygen pages/groups, copydoc, \ref links
 * - Assets via @image/@include/@snippet
 * - Deprecated and internal APIs
 * - Conditional compilation (#ifdef)
 */

/**
 * @page getting_started Getting Started
 * Welcome to the **torture** header. See \ref init_library and \ref api_version.
 * @note This page should render as a standalone MDX file.
 * @image html images/logo.png Library Logo
 * @include examples/quickstart.c
 */

/**
 * @defgroup core Core API
 * @brief Initialization, shutdown, and version queries.
 * Use these before anything else.
 */

/**
 * @defgroup http HTTP Helpers
 * @brief Minimal HTTP helpers for tests.
 */

/**
 * @defgroup types Types
 * @brief Typedefs, enums, and PODs.
 */

/* ========================================================================================
 *  Macros
 * ====================================================================================== */

/** Constant macro. */
#define API_OK 0

/** Another constant with value expression. */
#define API_ERROR_INVALID (-22)

/** Function-like macro. */
#define API_MIN(a,b) (( (a) < (b) ) ? (a) : (b))

/** Multiline function-like macro. */
#define API_LOGF(fmt, ...)    \
  do {                        \
    printf((fmt), __VA_ARGS__); \
  } while (0)

/* ========================================================================================
 *  Typedefs (incl. callback)
 * ====================================================================================== */

/**
 * @ingroup types
 * @brief Opaque handle type.
 */
typedef struct ApiHandle_t* ApiHandle;

/**
 * @ingroup types
 * @brief Callback invoked when an async request completes.
 * @param [in] status 0 on success, negative on error.
 * @param [in] user   user-supplied context pointer.
 */
typedef void (*ApiCompletionCb)(int status, void* user);

/**
 * @ingroup types
 * @brief Result object (POD).
 */
typedef struct ApiResult {
  int   code;
  char  message[128];
} ApiResult;

/* Anonymous function-pointer typedef (edge-case detection). */
typedef int (*AnonFnPtr)(const char*);

/* ========================================================================================
 *  Enums (named & anonymous)
 * ====================================================================================== */

/**
 * @ingroup types
 * @brief Log levels.
 */
enum ApiLogLevel {
  API_LOG_DEBUG = 10,
  API_LOG_INFO  = 20,
  API_LOG_WARN  = 30,
  API_LOG_ERROR = 40,
};

/* Anonymous enum used as constants (should still be parsed). */
enum {
  API_DEFAULT_TIMEOUT_MS = 5000,
  API_MAX_RETRIES        = 5,
};

/* ========================================================================================
 *  Structs / Unions
 * ====================================================================================== */

/**
 * @ingroup types
 * @brief Configuration for initialization.
 */
typedef struct ApiConfig {
  int                timeout_ms;
  int                retries;
  const char*        base_url;
  ApiCompletionCb    on_ready;   /**< Optional callback when ready. */
} ApiConfig;

/**
 * @ingroup types
 * @brief Variant value container.
 */
typedef union ApiValue {
  int         i32;
  double      f64;
  const char* str;
} ApiValue;

/* ========================================================================================
 *  Core API (prototypes, inline, copydoc)
 * ====================================================================================== */

/**
 * @ingroup core
 * @brief Initializes the library.
 * @param [in] cfg Optional configuration; pass NULL for defaults.
 * @returns 0 on success; negative error code otherwise.
 * @since 1.0.0
 * @see shutdown_library
 * @snippet examples/quickstart.c INIT_SNIPPET
 */
int init_library(const ApiConfig* cfg);

/**
 * @ingroup core
 * @brief Shuts down the library and frees global resources.
 * @returns 0 on success.
 * @warning Calling twice is undefined behavior.
 */
int shutdown_library(void);

/**
 * @ingroup core
 * @brief Returns the semantic version string.
 * @returns Non-null, static, zero-terminated string.
 * @example
 * const char* v = api_version();
 * printf("API %s\n", v);
 */
const char* api_version(void);

/**
 * @ingroup core
 * @brief Returns the semantic version string (alias).
 * @copydoc api_version
 */
const char* api_get_version_alias(void);

/**
 * @ingroup core
 * @brief Returns build metadata string.
 * Demonstrates inline definition parsing.
 */
static inline const char* api_build_meta(void) {
  return "build:local+dev";
}

/* Prototype without docblock (should still appear). */
int api_set_log_level(enum ApiLogLevel lvl);

/* Duplicated declaration later (should be de-duped). */
int api_set_log_level(enum ApiLogLevel lvl);

/* ========================================================================================
 *  HTTP Helpers (prototypes & CRLF/whitespace tolerance)
 * ====================================================================================== */

/**
 * @ingroup http
 * @brief Performs a GET request into a user buffer (synchronous).
 * @param [in] path   Path portion (e.g., "/users").
 * @param [out] buf   Destination buffer.
 * @param [in]  size  Capacity of @p buf.
 * @returns 0 on success; negative error code on failure.
 * @see http_post_json
 */
int http_get(const char* path, char* buf, int size);

/** @ingroup http @brief POST with JSON body. */
int http_post_json(const char* path, const char* json, char* buf, int size);

/** @ingroup http @brief DELETE request (no body). */
int http_delete(const char* path);

/**
 * @ingroup http
 * @brief Inline helper that formats and logs a request line (edge-case: inline def).
 */
static inline void http_log_request(const char* method, const char* path)    { printf("%s %s\n", method, path); }

/* ========================================================================================
 *  Deprecated and Internal
 * ====================================================================================== */

/**
 * @ingroup core
 * @deprecated Use \ref api_set_log_level instead.
 * @brief Old logging setter preserved for ABI.
 */
int set_log_level_legacy(int level);

/**
 * @ingroup core
 * @internal Not part of public API; should be parsed but omitted if you filter.
 */
int _internal_rehash_caches(void);

/* ========================================================================================
 *  Error/Notes/Warnings/TODOs/Bugs
 * ====================================================================================== */

/**
 * @ingroup core
 * @brief Computes something tricky.
 * @param [in] x input value
 * @returns 0 or negative on error.
 * @error -11 overflow
 * @error -12 domain error
 * @note Fast-path when x==0.
 * @warning Not thread-safe prior to init_library().
 * @todo SIMD acceleration
 * @bug Rare off-by-one in legacy mode
 */
int compute_thing(int x);

/* ========================================================================================
 *  Conditional compilation (preprocessor allowlist test)
 * ====================================================================================== */

#ifdef EXPERIMENTAL
/** @ingroup core @brief Experimental function only when EXPERIMENTAL is defined. */
int experimental_feature_toggle(int enabled);
#endif

#ifndef DISABLE_INLINE_EXAMPLE
/* Inline definition with body (must be captured by DEF_GLOBAL). */
static inline int add3(int a, int b, int c) { return a + b + c; }
#endif

/* ========================================================================================
 *  Trick signatures & spacing (robust whitespace handling)
 * ====================================================================================== */

/* Odd spacing and tabs; pointer stars attached to name. */
/** @ingroup core @brief Returns a handle (may be NULL). */
ApiHandle   create_handle   (  const char*  name , int   flags );

/* Prototype that looks like a definition but ends with semicolon—still a prototype. */
static /*inline*/ int maybe_inline  (int x, int y);
/* Later we give a real inline definition for a different symbol: */
static inline int definitely_inline   (int x, int y)   { return x * y; }

/* Parameter names aligned and with comments. */
int param_styles(
    /*in*/  const char* key,
    /*out*/ ApiValue*   out_value   /* may be NULL */
);

/* ========================================================================================
 *  Cross-refs in descriptions
 * ====================================================================================== */

/**
 * @ingroup core
 * @brief Wrapper calling \ref compute_thing then \ref api_version.
 * @returns Whatever \ref compute_thing returns.
 */
int compute_wrapper(int x);

/* ========================================================================================
 *  Copydoc target with slightly different param names
 * ====================================================================================== */

/**
 * @ingroup core
 * @brief Opens a resource.
 * @param [in]  uri   Resource identifier.
 * @param [out] outH  Receives handle on success.
 * @returns 0 on success; negative error code otherwise.
 */
int resource_open(const char* uri, ApiHandle* outH);

/**
 * @ingroup core
 * @brief Alias using @copydoc to inherit docs.
 * @copydoc resource_open
 */
int open_resource(const char* uri, ApiHandle* outH);

/* ========================================================================================
 *  Union/struct fields and arrays (members table rendering)
 * ====================================================================================== */

/**
 * @ingroup types
 * @brief Complex POD with arrays and pointers.
 */
typedef struct ApiComplex {
  int          id;
  double       weights[4];
  const char*  label;
  union {
    int    i;
    double d;
  } variant;
} ApiComplex;

/* ========================================================================================
 *  End
 * ====================================================================================== */

