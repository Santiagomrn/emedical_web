'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">medical-portal documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-67827a75ee3d4d8fe5dc0ad2f464a80c"' : 'data-target="#xs-components-links-module-AppModule-67827a75ee3d4d8fe5dc0ad2f464a80c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-67827a75ee3d4d8fe5dc0ad2f464a80c"' :
                                            'id="xs-components-links-module-AppModule-67827a75ee3d4d8fe5dc0ad2f464a80c"' }>
                                            <li class="link">
                                                <a href="components/AboutUsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutUsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdministratorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdministratorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppointmentCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppointmentCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppointmentEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppointmentEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactUsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactUsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashbordAppoinmentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashbordAppoinmentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DoctorsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DoctorsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DoctorsCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DoctorsCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListAppoinrmentPatientsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListAppoinrmentPatientsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListAppointmentDoctorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListAppointmentDoctorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListNewsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListNewsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListPatientsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListPatientsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MedicamentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MedicamentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatientsCreateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PatientsCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileDoctorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileDoctorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileDoctorsPatientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileDoctorsPatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfilePatientsDoctorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfilePatientsDoctorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-67827a75ee3d4d8fe5dc0ad2f464a80c"' : 'data-target="#xs-injectables-links-module-AppModule-67827a75ee3d4d8fe5dc0ad2f464a80c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-67827a75ee3d4d8fe5dc0ad2f464a80c"' :
                                        'id="xs-injectables-links-module-AppModule-67827a75ee3d4d8fe5dc0ad2f464a80c"' }>
                                        <li class="link">
                                            <a href="injectables/DoctorAPIService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DoctorAPIService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MedicamentService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MedicamentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PatientsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PatientsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyErrorStateMatcher.html" data-type="entity-link">MyErrorStateMatcher</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppointmentService.html" data-type="entity-link">AppointmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DoctorAPIService.html" data-type="entity-link">DoctorAPIService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DoctorService.html" data-type="entity-link">DoctorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MedicamentService.html" data-type="entity-link">MedicamentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewsService.html" data-type="entity-link">NewsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PatientsService.html" data-type="entity-link">PatientsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoleGuardService.html" data-type="entity-link">RoleGuardService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/_DoctorInterface.html" data-type="entity-link">_DoctorInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppointmentInterface.html" data-type="entity-link">AppointmentInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DoctorInterface.html" data-type="entity-link">DoctorInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MedicamentInterface.html" data-type="entity-link">MedicamentInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewsInterface.html" data-type="entity-link">NewsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NotAvailable.html" data-type="entity-link">NotAvailable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PatientsInterface.html" data-type="entity-link">PatientsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Section.html" data-type="entity-link">Section</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});