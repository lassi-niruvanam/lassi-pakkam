import type { App } from "vue";
import { Nuchabäl } from 'nuchabal';

export default {
    install: (app: App) => {
      const nuchabäl = new Nuchabäl({})
      app.provide('nuchabäl', nuchabäl);
    },
  };