import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'

import SideBar from './Sidebar'


const drawerWidth = 240

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    flex: {
        flex: 1
    },
    navGrid: {
        overflow: 'hidden',
        userSelect: 'none'
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperMobile: {
        width: drawerWidth
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: 0
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3
    }
})

class MainLayout extends Component {
    state = {
        open: true,
        mobileOpen: false
    }

    handleDrawerToggle = () => {
        const { theme } = this.props
        const width = theme.breakpoints.values.md
        const hideMobile = window.innerWidth > width
        this.setState(state => ({
            open: hideMobile ? !state.open : state.open,
            mobileOpen: hideMobile ? state.mobileOpen : !state.mobileOpen
        }))
    }

    handleDrawerMobileClose = () => {
        this.setState({
            mobileOpen: false
        })
    }

    render() {
        const { mobileOpen, open } = this.state
        const { classes, children } = this.props
        return (
            <div className={classes.root}>
                <AppBar
                    position="absolute"
                    className={classes.appBar}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Grid
                            container
                            spacing={24}
                            alignItems="center"
                            wrap="nowrap"
                            className={classes.navGrid}
                        >
                            <Grid item>
                                <Typography variant="title" color="inherit" noWrap>
                                    MyReads Project
                                </Typography>
                            </Grid>
                            <Grid item zeroMinWidth />
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={this.handleDrawerMobileClose}
                        classes={{
                            paper: classes.drawerPaperMobile
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        <SideBar />
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
                        }}
                        open={open}
                    >
                        <div className={classes.toolbar} />
                        <SideBar />
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
                </main>
            </div>
        )
    }
}

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.element
}

export default withStyles(styles, { withTheme: true })(MainLayout)
