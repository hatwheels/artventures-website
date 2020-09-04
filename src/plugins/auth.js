import auth0 from 'auth0-js'
import axios from 'axios'
import Vue from 'vue'

let webAuth = new auth0.WebAuth({
    domain: process.env.GRIDSOME_AUTH0_DOMAIN,
    clientID: process.env.GRIDSOME_AUTH0_CLIENT_ID,
    redirectUri:  process.env.GRIDSOME_SITE_URL + '/auth0cb',
    audience: 'https://' + process.env.GRIDSOME_AUTH0_DOMAIN + '/api/v2/',
    responseType: 'token id_token',
    scope: 'openid email profile'
})

let auth = new Vue({
    computed: {
        token: {
            get: function() {
                if (process.isClient) {
                    return localStorage.getItem('id_token')
                } else {
                    return null
                }
            },
            set: function(id_token) {
                if (process.isClient) {
                    localStorage.setItem('id_token', id_token)
                }
            }
        },
        accessToken: {
            get: function() {
                if (process.isClient) {
                    return localStorage.getItem('access_token')
                }
                else {
                    return null
                }
            },
            set: function(accessToken) {
                if (process.isClient) {
                    localStorage.setItem('access_token', accessToken)
                }
            }
        },
        expiresAt: {
            get: function() {
                if (process.isClient) {
                    return localStorage.getItem('expires_at')
                }
                else {
                    return null
                }
            },
            set: function(expiresIn) {
                if (process.isClient){
                    let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
                    localStorage.setItem('expires_at', expiresAt)
                }
            }
        },
        user: {
            get: function() {
                if (process.isClient) {
                    return JSON.parse(localStorage.getItem('user'))
                }
                else {
                    return null
                }
            },
            set: function(user) {
                if (process.isClient) {
                    localStorage.setItem('user', JSON.stringify(user))
                }
            }
        },
        userRole: {
            get: function() {
                if (process.isClient) {
                    return JSON.parse(localStorage.getItem('userRole'))
                } else {
                    return null
                }
            },
            set: function(userRole) {
                if (process.isClient) {
                    localStorage.setItem('userRole', JSON.stringify(userRole))
                }
            }
        },
        provider: {
            get: function() {
                if (process.isClient) {
                    return JSON.parse(localStorage.getItem('provider'))
                }
                else {
                    return null;
                }
            },
            set: function(provider) {
                if (process.isClient) {
                    localStorage.setItem('provider', JSON.stringify(provider))
                }
            }
        },
    },
    methods: {
        login() {
            webAuth.authorize()
        },
        logout() {
            return new Promise((resolve, reject) => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('id_token')
                localStorage.removeItem('expires_at')
                localStorage.removeItem('user')
                localStorage.removeItem('userRole')
                localStorage.removeItem('provider')
                webAuth.logout({
                    returnTo: process.env.GRIDSOME_SITE_URL,
                    clientID: process.env.GRIDSOME_AUTH0_CLIENT_ID,
                    federated: false
                })
            })
        },
        isAuthenticated() {
            return new Date().getTime() < this.expiresAt && this.user
        },
        handleAuthentication() {
            return new Promise((resolve, reject) => {
                webAuth.parseHash((err, authResult) => {
                    if (authResult && authResult.accessToken && authResult.idToken) {
                        this.expiresAt = authResult.expiresIn
                        this.accessToken = authResult.accessToken
                        this.token = authResult.idToken
                        this.user = authResult.idTokenPayload
                        resolve()
                    }
                    else if (err) {
                        this.logout()
                        reject(err)
                    }
                })
            })
        },
        resetPassword() {
            return new Promise((resolve, reject) => {
                webAuth.changePassword({
                    connection: 'Username-Password-Authentication',
                    email: this.user.email
                }, function (err, resp) {
                    if (err){
                        reject(err);
                    } else {
                        resolve(resp)
                    }
                });
            })
        },
        getProvider() {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/auth0-get-user',
                    {
                        user_id: this.user.sub,
                        token: process.env.GRIDSOME_AUTH0_MASTER_TOKEN
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => {
                    if (200 == res.status) {
                        this.provider = res.data.identities[0].provider
                        resolve()
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getUserRole() {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/auth0-get-user-role',
                    {
                        user_id: this.user.sub,
                        token: process.env.GRIDSOME_AUTH0_MASTER_TOKEN
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => {
                    // success
                    if (200 == res.status) {
                        if (!res.data || res.data.length == 0) {
                            let that = this
                            // Assign default user
                            this.assignUserRole("user")
                                .then((role) => {
                                    that.userRole = role
                                    resolve()
                                })
                                .catch(err => reject(err))
                        } else {
                            this.userRole = res.data
                            resolve()
                        }
                    } else {
                        reject(res.status)
                    }
                }).catch(err => reject(err))
            })
        },
        assignUserRole(role) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/auth0-assign-user-role',
                    {
                        user_id: this.user.sub,
                        role_id: role,
                        token: process.env.GRIDSOME_AUTH0_MASTER_TOKEN,
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then((res) => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
})

export default {
    install: function(Vue) {
        Vue.prototype.$auth = auth
    }
}