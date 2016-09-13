import { paging as pagingActions } from "../store";

const Pageable = {

  componentDidMount() {
    this._bindPageOnScroll = this._pageOnScroll.bind(this);
    window.addEventListener("scroll", this._bindPageOnScroll);
  },

  componentWillUnmount() {
    window.removeEventListener("scroll", this._bindPageOnScroll);
    this.props.dispatch(pagingActions.reset());
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data.loading) return false;

    return true;
  },

  _pageOnScroll(event) {
    if (this.props.paging.done) return;

    const scrollPosition = window.scrollY;
    const deviceHeight = window.outerHeight;
    const contentHeight = document.body.clientHeight;
    const threshold = 0.7;

    if ((scrollPosition + deviceHeight) / contentHeight > threshold && this.props.paging.shouldUpdate) {
      this.props.dispatch(pagingActions.pause());
      this.props.dispatch(pagingActions.increment());

      // wait a bit to prevent paging multiple times
      setTimeout(() => {
        this.props.dispatch(pagingActions.resume());
      }, 1000);
    }
  },

};

export default Pageable;
