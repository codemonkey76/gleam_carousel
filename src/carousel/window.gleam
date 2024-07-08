import carousel/types

@external(javascript, "../ffi.mjs", "requestAnimationFrame")
pub fn request_animation_frame(callback: fn(Float) -> Nil) -> types.RequestID
