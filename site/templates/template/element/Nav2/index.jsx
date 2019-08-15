import React from 'react';
import TweenOne from 'rc-tween-one';
import { Link } from 'rc-scroll-anim';
/* replace-start */
import './index.less';
/* replace-end */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
      menuHeight: 0,
    };
    this.menu = React.createRef();
  }

  /* replace-start */
  componentWillReceiveProps(nextProps) {
    const { func } = nextProps;
    if (func) {
      this.setState({
        phoneOpen: func.open,
        menuHeight: func.open ? this.menu.current.dom.scrollHeight : 0,
      });
    }
  }
  /* replace-end */

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
      menuHeight: phoneOpen ? this.menu.current.dom.scrollHeight : 0,
    });
  }

  render() {
    const { dataSource, isMobile, ...props } = this.props;

    const { menuHeight, phoneOpen } = this.state;
    const { LinkMenu } = dataSource;
    const navData = LinkMenu.children;
    const navChildren = Object.keys(navData)
      .map((key, i) => (
        <Link
          key={i.toString()}
          {...navData[key]}
         /* replace-start */
          data-edit="LinkMenu"
         /* replace-end */
        >
          {
            /* replace-start-value = navData[key].children */
            React.createElement('span', { dangerouslySetInnerHTML: { __html: navData[key].children } })
            /* replace-end-value */
          }
        </Link>
      ));
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...dataSource.wrapper}
        {...props}
      >
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}
        >
          <TweenOne
            animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            {...dataSource.logo}
          >
            <img width="100%" src={dataSource.logo.children} alt="img" />
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick();
              }}
              /* replace-start */
              data-edit="LinkMenu"
            /* replace-end */
            >
              <em />
              <em />
              <em />
            </div>
          )
          }
          <TweenOne
            {...LinkMenu}
            animation={{ x: 30, type: 'from', ease: 'easeOutQuad' }}
            ref={this.menu}// {(c) => { this.menu = c; }}
            style={isMobile ? { height: menuHeight } : null}
            /* replace-start */
            data-edit="LinkMenu"
          /* replace-end */
          >
            {navChildren}
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

export default Header;
