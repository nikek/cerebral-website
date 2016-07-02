import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';
import Router from 'cerebral-module-router';

import rootRouted from './signals/rootRouted';
import introductionClicked from './signals/introductionClicked';
import documentClicked from './signals/documentClicked';
import getStartedClicked from './signals/getStartedClicked';
import menuButtonClicked from './signals/menuButtonClicked';
import closeMenuButtonClicked from './signals/closeMenuButtonClicked';
import appClicked from './signals/appClicked';

const controller = Controller(Model(window.BOOTSTRAP_STATE));

controller.addSignals({
  rootRouted,
  introductionClicked,
  getStartedClicked,
  documentClicked,
  menuButtonClicked,
  closeMenuButtonClicked,
  appClicked
});

controller.addModules({

  router: Router({
    '/': 'rootRouted',
    '/documentation': 'introductionClicked',
    '/documentation/:doc': 'documentClicked'
  })
});

export default controller;