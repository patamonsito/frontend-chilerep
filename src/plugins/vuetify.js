import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(Vuetify);
Vue.use(VueObserveVisibility);

Vue.directive('observe-visibility', VueObserveVisibility.ObserveVisibility)

export default new Vuetify({
});
