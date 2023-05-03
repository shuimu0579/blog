import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'
import "/common01.css";

export default {
  ...DefaultTheme,
  Layout: MyLayout,
};
