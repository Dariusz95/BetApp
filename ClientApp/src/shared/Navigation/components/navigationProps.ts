export type NavigationProps = {
    navItems: NavigationItems[]
}

export type NavigationItems = {
    text: string
    url: string
    onClick?: () => Promise<void>
}