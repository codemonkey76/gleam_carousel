import carousel/types

@external(javascript, "../ffi.mjs", "setTimeout")
pub fn set_timeout(delay: Int, callback: fn() -> a) -> types.TimerID

@external(javascript, "../ffi.mjs", "clearTimeout")
pub fn clear_timeout(timer: types.TimerID) -> Nil
