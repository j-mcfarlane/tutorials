export interface Theme {
    name: string
    fontFamily: string
    fontColor: string
    backgroundColor: string
    slideBackgroundColor: string
    accentColor: string
    gradientBackground?: string
    sidebarColor?: string
    navbarColor?: string
    type: 'light' | 'dark'
}
