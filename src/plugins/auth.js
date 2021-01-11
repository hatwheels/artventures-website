/* User Authentication plugin */

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
        user_metadata: {
            get: function() {
                if (process.isClient) {
                    return JSON.parse(localStorage.getItem('user_metadata'))
                }
                else {
                    return null;
                }
            },
            set: function(user_metadata) {
                if (process.isClient) {
                    localStorage.setItem('user_metadata', JSON.stringify(user_metadata))
                }
            }
        },
    },
    methods: {
        /* Authentication methods */
        login() {
            webAuth.authorize()
        },
        logout() {
            return new Promise(() => {
                localStorage.removeItem('access_token')
                localStorage.removeItem('id_token')
                localStorage.removeItem('expires_at')
                localStorage.removeItem('user')
                localStorage.removeItem('userRole')
                localStorage.removeItem('provider')
                localStorage.removeItem('user_metadata')
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
                        resolve(this.user.sub);
                    }
                    else if (err) {
                        this.logout();
                        reject(err);
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
        /* Authenticated user methods */
        getUser() {
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
                        this.user_metadata = res.data.user_metadata || {}
                        resolve()
                    } else {
                        reject(res.status)
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
                            resolve(null)
                        } else {
                            this.userRole = res.data
                            resolve(res.data)
                        }
                    } else {
                        reject(res.status)
                    }
                }).catch(err => reject(err))
            })
        },
        updateUser(data) {
            return new Promise((resolve, reject) => {
                data.token = process.env.GRIDSOME_AUTH0_MASTER_TOKEN
                data.user_id = this.user.sub

                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/auth0-update-user',
                    data,
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => {
                    // success
                    if (200 === res.status) {
                        const data = res.data;
                        let user = this.user;
                        if (data.hasOwnProperty('given_name')) {
                            user.given_name = data.given_name;
                        }
                        if (data.hasOwnProperty('family_name')) {
                            user.family_name = data.family_name;
                        }
                        if (data.hasOwnProperty('name')) {
                            user.name = data.name;
                        }
                        if (data.hasOwnProperty('nickname')) {
                            user.nickname = data.nickname;
                        }
                        if (data.hasOwnProperty('email')) {
                            user.email = data.email;
                        }
                        if (data.hasOwnProperty('email_verified')) {
                            user.email_verified = data.email_verified;
                        }
                        if (data.hasOwnProperty('verify_email')) {
                            user.verify_email = data.verify_email;
                        }
                        if (data.hasOwnProperty('picture')) {
                            user.picture = data.picture;
                        }
                        if (data.hasOwnProperty('user_metadata')) {
                            this.user_metadata = data.user_metadata
                            if (data.user_metadata.hasOwnProperty('bio')) {
                                this.user_metadata.bio = data.user_metadata.bio;
                            }
                            if (data.user_metadata.hasOwnProperty('acceptedTerms')) {
                                this.user_metadata.acceptedTerms = data.user_metadata.acceptedTerms;
                            }
                        }
                        this.user = user;
                        resolve();
                    } else {
                        reject(res.status);
                    }
                }).catch(err => reject(err))
            })
        },
        assignUserRole(role) {
            const that = this
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
                    const roleObj = res.data
                    that.userRole = roleObj
                    resolve(roleObj)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        updateUserRole(newRole) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/auth0-update-user-role',
                    {
                        user_id: this.user.sub,
                        add_role_id: newRole,
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
                    // Update localstore userRole in caller
                    const roleObj = res.data
                    resolve(roleObj)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        /* Management methods */
        getMgUsersInRole(roleName) {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/auth0-get-role-id',
                    {
                        role_name: roleName
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => {
                    const roleId = res.data;
                    axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/auth0-get-users-in-role-id',
                        {
                            role_id: roleId
                        },
                        {
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Headers": "Content-Type",
                                "Content-Type": "application/json"
                            }
                        }
                    ).then(res => resolve(res.data))
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getMgUser(userId, roleName="artist") {
            return new Promise((resolve, reject) => {
                axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/auth0-get-user-role',
                    {
                        token: process.env.GRIDSOME_AUTH0_MASTER_TOKEN,
                        user_id: userId
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(res => {
                    if (200 === res.status) {
                        if (res.hasOwnProperty("data") && res.data.length > 0 && res.data[0].name === roleName) {
                            axios.post(process.env.GRIDSOME_SITE_URL + '/.netlify/functions/auth0-get-user',
                                {
                                    user_id: userId,
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
                                if (200 === res.status) {
                                    resolve(res.data);
                                } else {
                                    reject(res.status);
                                }
                            }).catch(err => {
                                reject(err);
                            })
                        } else {
                            reject(404);
                        }
                    } else {
                        reject(res.status);
                    }
                }).catch(err => {
                    reject(err);
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