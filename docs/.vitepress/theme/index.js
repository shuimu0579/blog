import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'
import "/baseaLias/common.css";

export default {
  ...DefaultTheme,
  Layout: MyLayout,
};
