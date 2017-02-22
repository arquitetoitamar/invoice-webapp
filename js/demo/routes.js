angular
    .module('app')
    .config(['$stateProvider', '$urlRouterProvider', 
    '$ocLazyLoadProvider', '$breadcrumbProvider', 
    function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
        $stateProvider
            .state('app.icons', {
                url: "/icons",
                abstract: true,
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: 'Icons'
                }
            })
            .state('app.icons.fontawesome', {
                url: '/font-awesome',
                templateUrl: 'views/icons/font-awesome.html',
                ncyBreadcrumb: {
                    label: 'Font Awesome'
                }
            })
            .state('app.icons.simplelineicons', {
                url: '/simple-line-icons',
                templateUrl: 'views/icons/simple-line-icons.html',
                ncyBreadcrumb: {
                    label: 'Simple Line Icons'
                }
            })
            .state('app.components', {
                url: "/components",
                abstract: true,
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: 'Components'
                }
            })
            .state('app.components.buttons', {
                url: '/buttons',
                templateUrl: 'views/components/buttons.html',
                ncyBreadcrumb: {
                    label: 'Buttons'
                }
            })
            .state('app.components.social-buttons', {
                url: '/social-buttons',
                templateUrl: 'views/components/social-buttons.html',
                ncyBreadcrumb: {
                    label: 'Social Buttons'
                }
            })
            .state('app.components.cards', {
                url: '/cards',
                templateUrl: 'views/components/cards.html',
                ncyBreadcrumb: {
                    label: 'Cards'
                }
            })
            .state('app.components.forms', {
                url: '/forms',
                templateUrl: 'views/components/forms.html',
                ncyBreadcrumb: {
                    label: 'Forms'
                }
            })
            .state('app.components.switches', {
                url: '/switches',
                templateUrl: 'views/components/switches.html',
                ncyBreadcrumb: {
                    label: 'Switches'
                }
            })
            .state('app.components.tables', {
                url: '/tables',
                templateUrl: 'views/components/tables.html',
                ncyBreadcrumb: {
                    label: 'Tables'
                }
            })
            .state('app.forms', {
                url: '/forms',
                templateUrl: 'views/forms.html',
                ncyBreadcrumb: {
                    label: 'Forms'
                },
                resolve: {
                    loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                serie: true,
                                files: ['js/libs/moment.min.js']
                            },
                            {
                                serie: true,
                                files: ['js/libs/daterangepicker.min.js', 
                                'js/libs/angular-daterangepicker.min.js']
                            },
                            {
                                files: ['js/libs/mask.min.js']
                            },
                            {
                                files: ['js/libs/select.min.js']
                            }
                        ]);
                    }],
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/forms.js']
                        });
                    }]
                }
            })
          //clientes
           .state('app.clientes', {
                url: '/clientes',
                templateUrl: 'views/clientes/customers.html',
                ncyBreadcrumb: {
                    label: 'Clientes'
                },
                
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['js/controllers/customers.js']
                        });
                    }]
                }
            })
            .state('app.clientes.incluir', {
                url: '/incluir',
                templateUrl: 'views/clientes/customers.html',
                ncyBreadcrumb: {
                    label: 'Incluir'
                },
                
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['js/controllers/customers.js']
                        });
                    }]
                }
            })
            // empresas emissoras de notas
            .state('app.empresas', {
                url: '/empresas',
                templateUrl: 'views/companys/companys.html',
                ncyBreadcrumb: {
                    label: 'Empresas'
                },
                
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['js/controllers/companys.js']
                        });
                    }]
                }
            })
            .state('app.empresas.incluir', {
                url: '/incluir',
                templateUrl: 'views/companys/companys.html',
                ncyBreadcrumb: {
                    label: 'Incluir'
                },
                
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['js/controllers/companys.js']
                        });
                    }]
                }
            })
             
              // mercadorias items
            .state('app.mercadorias', {
                url: '/mercadorias',
                templateUrl: 'views/items/items.html',
                ncyBreadcrumb: {
                    label: 'Mercadorias'
                },
                
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['js/controllers/items.js']
                        });
                    }]
                }
            })
            .state('app.mercadorias.incluir', {
                url: '/incluir',
                templateUrl: 'views/items/items.html',
                ncyBreadcrumb: {
                    label: 'Incluir'
                },
                
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['js/controllers/items.js']
                        });
                    }]
                }
            })
               // notas fiscais
            .state('app.notas', {
                url: '/notas',
                templateUrl: 'views/invoices/invoices.html',
                ncyBreadcrumb: {
                    label: 'Notas Fiscais'
                },
                
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['js/controllers/invoices.js']
                        });
                    }]
                }
            })
            .state('app.notas.incluir', {
                url: '/incluir',
                templateUrl: 'views/invoices/invoices.html',
                ncyBreadcrumb: {
                    label: 'Incluir'
                },
                
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['js/controllers/invoices.js']
                        });
                    }]
                }
            })
            .state('app.widgets', {
                url: '/widgets',
                templateUrl: 'views/widgets.html',
                ncyBreadcrumb: {
                    label: 'Widgets'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['js/controllers/widgets.js']
                        });
                    }]
                }
            })
              
            .state('app.charts', {
                url: '/charts',
                templateUrl: 'views/charts.html',
                ncyBreadcrumb: {
                    label: 'Charts'
                },
                resolve: {
                    // Plugins loaded before
                    // loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
                    //     return $ocLazyLoad.load([
                    //         {
                    //             serial: true,
                    //             files: ['js/libs/Chart.min.js', 'js/libs/angular-chart.min.js']
                    //         }
                    //     ]);
                    // }],
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/charts.js']
                        });
                    }]
                }
            })
    }]);
