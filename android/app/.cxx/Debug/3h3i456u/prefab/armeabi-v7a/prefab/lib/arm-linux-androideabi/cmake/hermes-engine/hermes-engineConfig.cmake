if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/Administrator/.gradle/caches/transforms-3/0eba9a168eb8819dccb7829f2ba40fb2/transformed/jetified-hermes-android-0.72.4-debug/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/Administrator/.gradle/caches/transforms-3/0eba9a168eb8819dccb7829f2ba40fb2/transformed/jetified-hermes-android-0.72.4-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

