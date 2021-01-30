import { browser, by, element } from 'protractor';

/**
 * Clase para la página principal o de raíz
 */
export class AppPage {
  /**
   * Realiza la navegación de la promesa
   */
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  /**
   *  Realiza una promesa para la funcionalidad de compoDoc
   */
  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
