import signal_lost from './images/signal_lost.png'
import grue from './images/grue.png'
import trader from './images/trade.png'
import default_image from './images/default.png'

export const special_nodes = ["FAIL","FAIL_DEATH","WIN","GO_BACK"]

export const site_traits = ["ruins","technology present","space station","alien","habitable","spaceship","in space","on surface"]

export const scan_bands = ["Plasma absorption band","Hydrocarbons/Molecular oxygen","Narrow-band radio waves","Exotic Radiation","Increased Density"]

export const loot_types = ["maint","drugs","research","weapons","pets","unique"]


export const preset_images = {
    default : default_image,
    grue : grue,
    signal_lost : signal_lost,
    trader : trader
}

export const EffectTypes = {
    Add : "Add",
    Set : "Set",
    Remove : "Remove",
}

export const ValueTypes = {
    raw : "raw",
    random : "random"
}