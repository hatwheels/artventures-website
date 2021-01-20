<template>
    <UserLayout>
      <v-main>
        <v-container class="px-0 py-12" fluid>
            <div
                :class="getLang === 'gr' ? 'noto-38-700' : 'playfair-38-700'"
                class="pb-10 my-0 text-center"
                v-html="getLang === 'gr' ? 'Οι Ρυθμίσεις μου' : 'My Settings'"
            />
            <!-- Desktop -->
            <v-row class="hidden-sm-and-down" justify="center" align="start">
                <v-col offset="2" cols="4">
                    <form lazy-validation @submit.prevent="submit()">
                        <v-row justify="start" align="center">
                            <v-col cols="10">
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                    v-html="form.firstName[getLang]"
                                />
                                <v-text-field
                                    v-model.trim="firstName"
                                    background-color="#FAFAFA"
                                    color="#1A1A1A"
                                    :placeholder="getLang === 'en' ? 'Your First Name...' : 'Το Όνομα σας...'"
                                    :error-messages="firstNameErrors"
                                    outlined
                                    required
                                    @input="delayTouch($v.firstName)"
                                    @blur="$v.firstName.$touch()"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="start" align="center">
                            <v-col cols="10">
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                    v-html="form.lastName[getLang]"
                                />
                                <v-text-field
                                    v-model.trim="lastName"
                                    background-color="#FAFAFA"
                                    color="#1A1A1A"
                                    :placeholder="getLang === 'en' ? 'Your Last Name...' : 'Το Επίθετο σας...'"
                                    :error-messages="lastNameErrors"
                                    outlined
                                    required
                                    @input="delayTouch($v.lastName)"
                                    @blur="$v.lastName.$touch()"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="start" align="center">
                            <v-col cols="10">
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                    v-html="form.nickname[getLang]"
                                />
                                <v-text-field
                                    v-model.trim="nickname"
                                    background-color="#FAFAFA"
                                    color="#1A1A1A"
                                    :placeholder="getLang === 'en' ? 'Your Nickname...' : 'Το Καλλιτεχνικό σας Όνομα...'"
                                    :error-messages="nicknameErrors"
                                    outlined
                                    required
                                    @input="delayTouch($v.nickname)"
                                    @blur="$v.nickname.$touch()"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="start" align="center">
                            <v-col cols="10">
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                >
                                    {{ form.email[getLang] }}
                                    <span
                                        v-if="provider !== 'auth0'"
                                        :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'">
                                            {{ form.email.readonly[getLang] }} {{ availableProviders[provider] }}.
                                    </span>
                                </label>
                                <v-text-field
                                    v-model="email"
                                    background-color="#FAFAFA"
                                    color="#1A1A1A"
                                    :error-messages="emailErrors"
                                    :placeholder="getLang === 'en' ? 'Your Email...' : 'Το Email σας'"
                                    outlined
                                    required
                                    :disabled="provider !== 'auth0'"
                                    :readonly="provider !== 'auth0'"
                                    @input="delayTouch($v.email)"
                                    @blur="$v.email.$touch()"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row justify="start" align="center">
                            <v-col cols="10">
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                >
                                    {{ form.bio[getLang] }}
                                </label>
                                <v-textarea
                                    v-model="bio"
                                    :error-messages="bioErrors"
                                    outlined
                                    counter='5000'
                                    auto-grow
                                    color="#1A1A1A"
                                    :placeholder="getLang === 'en' ? 'Tell us about yourself...' : 'Πείτε μας κάποια λόγια για τον εαυτό σας...'"
                                    @input="delayTouch($v.bio)"
                                    @blur="$v.bio.$touch()"
                                >
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-row justify="start" align="center">
                            <v-col cols="10">
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                    v-html="form.role[getLang]"
                                />
                                <v-radio-group
                                    v-if="getUserRoleName() === 'admin'"
                                    v-model="role"
                                    row
                                    :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                                >
                                    <v-radio
                                        color="rgba(26,26,26,1)"
                                        :label="availableRoles.admin[getLang]"
                                        value="admin">
                                    </v-radio>
                                    <v-radio
                                        color="rgba(26,26,26,1)"
                                        :label="availableRoles.artist[getLang]"
                                        value="artist">
                                    </v-radio>
                                    <v-radio
                                        color="rgba(26,26,26,1)"
                                        :label="availableRoles.user[getLang]"
                                        value="user">
                                    </v-radio>
                                </v-radio-group>
                                <v-radio-group v-else v-model="role" row :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'">
                                    <v-radio
                                        color="rgba(26,26,26,1)"
                                        :label="availableRoles.artist[getLang]"
                                        value="artist">
                                    </v-radio>
                                    <v-radio
                                        color="rgba(26,26,26,1)"
                                        :label="availableRoles.user[getLang]"
                                        value="user">
                                    </v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row justify="start" align="center">
                            <v-col cols="10">
                                <v-btn
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="text-capitalize white--text"
                                    color="#333333"
                                    type="submit"
                                    :disabled="$v.$invalid"
                                    :loading="isLoading"
                                >
                                    {{ buttons.form[getLang] }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </form>
                </v-col>
                <v-col cols="3">
                    <v-row justify="start" align="center">
                        <v-col class="pb-1">
                            <label
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="color-1a1a1a"
                                v-html="form.pic[getLang]"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="pb-1">
                            <g-image
                                v-if="pic.length > 0"
                                style="width: 200px;"
                                :src="pic"
                                fit="cover"
                                alt="profile pic"
                            />
                        </v-col>
                    </v-row>
                    <v-row class="pt-0">
                        <v-col>
                            <v-tooltip right :max-width="getLang === 'en' ? '200px' : '170px'">
                                <template v-slot:activator="{ on, attrs }">
                                    <label
                                        :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                        class="pic-btn white--text text-capitalize py-2 pl-2 pr-4 text-center"
                                        for="pic_profile_desktop"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon class="pb-1 white--text pr-2">mdi-pencil</v-icon>{{ buttons.pic[getLang] }}
                                    </label>
                                </template>
                                <span :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'">
                                    {{ getLang === 'en' ? 'Preferably small & square' : "Κατά προτίμηση μικρή & τετράγωνη" }}
                                </span>
                            </v-tooltip>
                            <input
                                id="pic_profile_desktop"
                                ref="picProfileDesktop"
                                name="pic_profile_desktop"
                                style="opacity: 0;"
                                :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                                accept="image/png, image/jpeg, image/bmp"
                                type="file"
                                @change="changeProfilePicDesktop"
                            >
                        </v-col>
                    </v-row>
                    <v-row class="pt-8" no-gutters justify="start" align="start">
                        <v-col>
                            <div
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="color-1a1a1a"
                                v-html="pw.title[getLang]"
                            />
                        </v-col>
                    </v-row>
                    <v-row justify="start" align="start" no-gutter>
                        <v-col cols="8">
                            <v-btn
                                dark
                                color="#333333"
                                v-if="provider === 'auth0'"
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="text-capitalize"
                                v-html="pw.reset[getLang]"
                                @click="pwDialog.toggle = true"
                            />
                            <div
                                v-else
                                :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                            >
                                {{ pw.text3rd['1st'][getLang] }}
                                <span class='raleway-16-600'>{{ availableProviders[provider] }}</span>
                                {{ pw.text3rd['2nd'][getLang] }}
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="pt-4" justify="start" align="start" no-gutter>
                        <v-col cols="8" class="pb-0">
                            <label
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="color-1a1a1a"
                                v-html="language[getLang]"
                            />
                        </v-col>
                    </v-row>
                    <v-row justify="start" align="start" no-gutter>
                        <v-col cols="8" class="py-0">
                            <v-select
                                v-model="chosenLanguage"
                                :items="getLanguages"
                                color="#333333"
                                item-color="#333333"
                                @change="setLanguage(chosenLanguage)"
                            />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <!-- Mobile -->
            <v-row class="hidden-md-and-up" justify="center" align="start">
                <v-col cols="10">
                    <v-row justify="center" align="center">
                        <v-col class="pb-1">
                            <label
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="color-1a1a1a"
                                v-html="form.pic[getLang]"
                            />
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col class="pb-1">
                            <g-image
                                v-if="pic.length > 0"
                                style="width: 150px;"
                                :src="pic"
                                fit="cover"
                                alt="profile pic"
                            />
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col>
                            <label
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="pic-btn white--text text-capitalize py-2 pl-2 pr-4 text-center"
                                for="pic_profile_mobile"
                            >
                                <v-icon class="pb-1 white--text pr-2">mdi-pencil</v-icon>{{ buttons.pic[getLang] }}
                            </label>
                            <input
                                id="pic_profile_mobile"
                                class="mx-0 my-0"
                                ref="picProfileMobile"
                                name="pic_profile_mobile"
                                style="opacity: 0;"
                                accept="image/png, image/jpeg, image/bmp"
                                type="file"
                                @change="changeProfilePicMobile"
                            >
                        </v-col>
                    </v-row>
                    <v-row class="pt-4" justify="center" align="center">
                        <v-col class="pb-1">
                            <div
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="color-1a1a1a"
                                v-html="pw.title[getLang]"
                            />
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="center">
                        <v-col>
                            <div>
                                <v-btn
                                    dark
                                    color="#333333"
                                    v-if="provider === 'auth0'"
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="text-capitalize"
                                    v-html="pw.reset[getLang]"
                                    @click="pwDialog.toggle = true"
                                />
                                <div
                                    v-else
                                    :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                                >
                                    {{ pw.text3rd['1st'][getLang] }}
                                    <span class='raleway-16-600'>{{ availableProviders[provider] }}</span>
                                    {{ pw.text3rd['2nd'][getLang] }}
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="pt-3" justify="center" align="center">
                        <v-col class="pb-1">
                            <label
                                :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                class="color-1a1a1a"
                                v-html="language[getLang]"
                            />
                        </v-col>
                    </v-row>
                    <v-row justify="start" align="center">
                        <v-col cols="4" sm="3" md="2" class="pt-1">
                            <div>
                                <v-select
                                    v-model="chosenLanguage"
                                    :items="getLanguages"
                                    color="#333333"
                                    item-color="#333333"
                                    @change="setLanguage(chosenLanguage)"
                                />
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="pt-6" justify="center" align="center">
                        <v-col>
                            <form lazy-validation @submit.prevent="submit()">
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                    v-html="form.firstName[getLang]"
                                />
                                <v-text-field
                                    v-model.trim="firstName"
                                    background-color="#FAFAFA"
                                    color="#1A1A1A"
                                    :placeholder="getLang === 'en' ? 'Your First Name...' : 'Το Όνομα σας...'"
                                    :error-messages="firstNameErrors"
                                    outlined
                                    required
                                    @input="delayTouch($v.firstName)"
                                    @blur="$v.firstName.$touch()"
                                ></v-text-field>
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                    v-html="form.lastName[getLang]"
                                />
                                <v-text-field
                                    v-model.trim="lastName"
                                    background-color="#FAFAFA"
                                    color="#1A1A1A"
                                    :placeholder="getLang === 'en' ? 'Your Last Name...' : 'Το Επίθετο σας...'"
                                    :error-messages="lastNameErrors"
                                    outlined
                                    required
                                    @input="delayTouch($v.lastName)"
                                    @blur="$v.lastName.$touch()"
                                ></v-text-field>
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                    v-html="form.nickname[getLang]"
                                />
                                <v-text-field
                                    v-model.trim="nickname"
                                    background-color="#FAFAFA"
                                    color="#1A1A1A"
                                    :placeholder="getLang === 'en' ? 'Your Nickname...' : 'Το Καλλιτεχνικό σας Όνομα...'"
                                    :error-messages="nicknameErrors"
                                    outlined
                                    required
                                    @input="delayTouch($v.nickname)"
                                    @blur="$v.nickname.$touch()"
                                ></v-text-field>
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                >
                                    {{ form.email[getLang] }}
                                    <span
                                        v-if="provider !== 'auth0'"
                                        :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'">
                                            {{ form.email.readonly[getLang] }} {{ availableProviders[provider] }}.
                                    </span>
                                </label>
                                <v-text-field
                                    v-model="email"
                                    background-color="#FAFAFA"
                                    color="#1A1A1A"
                                    :placeholder="getLang === 'en' ? 'Your Email...' : 'Το Email σας'"
                                    :error-messages="emailErrors"
                                    outlined
                                    required
                                    :disabled="provider !== 'auth0'"
                                    :readonly="provider !== 'auth0'"
                                    @input="delayTouch($v.email)"
                                    @blur="$v.email.$touch()"
                                ></v-text-field>
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                >
                                    {{ form.bio[getLang] }}
                                </label>
                                <v-textarea
                                    v-model="bio"
                                    :error-messages="bioErrors"
                                    outlined
                                    counter='5000'
                                    color="#1A1A1A"
                                    :placeholder="getLang === 'en' ? 'Tell us about yourself...' : 'Πείτε μας κάποια λόγια για τον εαυτό σας...'"
                                    @input="delayTouch($v.bio)"
                                    @blur="$v.bio.$touch()"
                                ></v-textarea>
                                <label
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="color-1a1a1a"
                                    v-html="form.role[getLang]"
                                />
                                <v-radio-group
                                    v-if="getUserRoleName() === 'admin'" 
                                    v-model="role"
                                    required
                                    row
                                    :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                                >
                                    <v-radio
                                        color="rgba(26,26,26,1)"
                                        :label="availableRoles.admin[getLang]"
                                        value="admin">
                                    </v-radio>
                                    <v-radio
                                        color="rgba(26,26,26,1)"
                                        :label="availableRoles.artist[getLang]"
                                        value="artist">
                                    </v-radio>
                                    <v-radio
                                        color="rgba(26,26,26,1)"
                                        :label="availableRoles.user[getLang]"
                                        value="user">
                                    </v-radio>
                                </v-radio-group>
                                <v-radio-group
                                    v-else
                                    v-model="role"
                                    required
                                    row
                                    :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                                >
                                    <v-radio
                                        color="rgba(26,26,26,1)"
                                        :label="availableRoles.artist[getLang]"
                                        value="artist">
                                    </v-radio>
                                    <v-radio
                                        color="rgba(26,26,26,1)"
                                        :label="availableRoles.user[getLang]"
                                        value="user">
                                    </v-radio>
                                </v-radio-group>
                                <v-btn
                                    :class="getLang === 'gr' ? 'noto-16-600' : 'raleway-16-600'"
                                    class="text-capitalize white--text"
                                    color="#333333"
                                    type="submit"
                                    :disabled="$v.$invalid"
                                    :loading="isLoading"
                                >
                                    {{ buttons.form[getLang] }}
                                </v-btn>
                            </form>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <!-- Dialogs -->
            <v-dialog v-model="picDialog.toggle" persistent max-width="290" overlay-color="transparent">
                <v-card>
                    <v-card-text
                        class="px-3 pt-2 pb-4"
                        :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'">
                        {{ picDialog.text[getLang] }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="black--text"
                            :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                            color="#FAFAFA" @click="uploadProfilePic()"
                        >
                            {{ getLang === 'gr' ? 'Ναι' : 'Yes' }}
                        </v-btn>
                        <v-btn
                            class="white--text"
                            :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                            color="#333333" @click="cancelUploadProfilePic()"
                        >
                            {{ getLang === 'gr' ? 'Όχι' : 'No' }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="picTooBigDialog.toggle" persistent max-width="290" overlay-color="transparent">
                <v-card>
                    <v-card-text
                        class="px-3 pt-2 pb-4"
                        :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'">
                        {{ picTooBigDialog.text[getLang] }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="white--text"
                            :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                            color="#333333" @click="picTooBigDialog.toggle = false"
                        >
                            OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="picUploadDialog.toggle" persistent max-width="290" overlay-color="transparent">
                <v-card>
                    <v-card-text
                        class="px-3 pt-2 pb-4"
                        :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'">
                        {{ picUploadDialog.text[getLang] }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="white--text"
                            :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                            color="#333333" @click="picUploadDialog.toggle = false"
                        >
                            OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="pwDialog.toggle" persistent max-width="290" overlay-color="transparent">
                <v-card>
                    <v-card-text
                        class="px-3 pt-2 pb-4"
                        :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'">
                        {{ pwDialog.text[getLang] }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="black--text"
                            :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                            color="#FAFAFA" @click="resetPasswordEmail()"
                        >
                            {{ getLang === 'gr' ? 'Ναι' : 'Yes' }}
                        </v-btn>
                        <v-btn
                            class="white--text"
                            :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                            color="#333333" @click="pwDialog.toggle = false"
                        >
                            {{ getLang === 'gr' ? 'Όχι' : 'No' }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="pwDialog.emailSent" persistent max-width="290" overlay-color="transparent">
                <v-card>
                    <v-card-text
                        class="px-3 pt-2 pb-4"
                        :class="getLang === 'gr' ? 'noto-16-400' : 'raleway-16-400'"
                    >
                        {{ pwDialog.emailText[getLang] }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="white--text"
                            :class="getLang === 'gr' ? 'noto-13-400' : 'raleway-13-400'"
                            color="#333333" @click="unsetPwDialogEmail()"
                        >
                            OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- Alerts -->
            <v-alert
                class="mt-2 settings-alert-block"
                :type='alertType'
                v-model="alert"
                dismissible
                transition="slide-x-transition"
            >
                {{ alertMsg }}
            </v-alert>
            <v-alert
                class="mt-1 settings-alert-block"
                :type='alertRoleType'
                v-model="alertRole"
                dismissible
                transition="slide-x-transition"
            >
                {{ alertRoleMsg }}
            </v-alert>
        </v-container>
      </v-main>
    </UserLayout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { validationMixin } from "vuelidate";
import { required, email, maxLength } from "vuelidate/lib/validators";

const touchMap = new WeakMap();
const alphaTick = (value) => /^[a-zA-Z- ]*$/.test(value)

export default {
  mixins: [validationMixin],
  validations: {
    firstName: { required, alphaTick },
    lastName: { required, alphaTick },
    nickname: { required },
    email: { required, email },
    bio: { maxLength: maxLength(5000) }
  },
  mounted () {
    if (process.isClient) {
        if (this.$auth.user) {
            this.firstName = this.$auth.user.given_name || ''
            this.lastName = this.$auth.user.family_name || ''
            this.nickname = this.$auth.user.nickname || ''
            this.email = this.$auth.user.email || ''
            this.pic = this.$auth.user.picture || ''
            var userMetadata = this.getUserMetadata()
            if (userMetadata) {
                this.bio = userMetadata.bio
            }
        }
        this.provider = this.$auth.provider || ''
        if (this.getUserRole()) {
            this.role = this.getUserRoleName() || ''
        }
    }
    this.chosenLanguage = this.getLang
  },
  data() {
    return {
        availableProviders: {
            auth0: "Auth0",
            "google-oauth2": "Google",
            "facebook": "Facebook"
        },
        chosenLanguage: '',
        language: {
            gr: 'Γλώσσα',
            en: 'Language'
        },
        pw: {
            title: {
                gr: 'Κωδικός Πρόσβασης',
                en: 'Password'
            },
            textauth0: {
                gr: '',
                en: ''
            },
            text3rd: {
                '1st': {
                    gr: "Χρησιμοποιείται ",
                    en: "You use ",
                },
                '2nd': {
                    gr: "για την σύνδεση σας, παρακαλώ αλλάξτε το κωδικό σας σ' αυτόν τον πάροχο αν το επιθυμείτε.",
                    en: "to login, please change your password at this provider if you wish so."
                }
            },
            reset: {
                gr: 'Επαναφορά κωδικού',
                en: 'Reset Password',
            }
        },
        availableRoles: {
            admin: {
                gr: 'Διαχειριστής',
                en: 'Administrator'
            },
            artist: {
                gr: 'Καλλιτέχνης',
                en: 'Artist'
            },
            user: {
                gr: 'Χρήστης',
                en: 'User'
            }
        },
        form: {
            errors: {
                firstName: {
                    invalid: {
                        gr: "Δεκτοί χαρακτήρες είναι oι λατινικοί αλφαβητικοί χαρακτήρες καθώς και το κενό και '-'.",
                        en: "Valid characters are latin alphabet characters as well whitespace and '-'.",
                    },
                    missing: {
                        gr: 'Το όνομα είναι υποχρεωτικό.',
                        en: 'First Name is required.',
                    }
                },
                lastName: {
                    invalid: {
                        gr: "Δεκτοί χαρακτήρες είναι oι λατινικοί αλφαβητικοί χαρακτήρες καθώς και το κενό και '-'.",
                        en: "Valid characters are latin alphabet characters as well whitespace and '-'.",
                    },
                    missing: {
                        gr: 'Το επίθετο είναι υποχρεωτικό.',
                        en: 'Last Name is required.',
                    }
                },
                nickname: {
                    gr: 'Το ψευδώνυμο είναι υποχρεωτικό.',
                    en: 'Nickname is required.',
                },
                email: {
                    invalid: {
                        gr: 'Το email δεν είναι έγκυρο.',
                        en: 'Must be valid e-mail.'
                    },
                    missing: {
                        gr: 'Το email είναι υποχρεωτικό.',
                        en: 'Email is required.'
                    },
                },
                bio: {
                    gr: "Το βιογραφικό σας δεν πρέπει να' χει πάνω από 5000 χαρακτήρες",
                    en: 'Your biography cannot have more than 5000 characters'
                }
            },
            firstName: {
                gr: 'Όνομα',
                en: 'First Name',
            },
            lastName: {
                gr: 'Επίθετο',
                en: 'Last Name',
            },
            nickname: {
                gr: 'Ψευδώνυμο',
                en: 'Nickname',
            },
            email: {
                gr: 'Ηλεκτρονική διεύθυνση',
                en: 'Email',
                readonly: {
                    gr: 'Δεν μπορείτε να αλλάξετε το email σας επειδή συνδέεστε μέσω',
                    en: 'Cannot change your email as you login via '
                }
            },
            bio: {
                gr: 'Βιογραφικό',
                en: 'Biography'
            },
            role: {
                gr: 'Ρόλος',
                en: 'Role'
            },
            pic: {
                gr: 'Εικόνα Προφίλ',
                en: 'Profile Pic'
            }
        },
        firstName: '',
        lastName: '',
        nickname: '',
        email: '',
        bio: '',
        role: '',
        pic: '',
        provider: '',
        buttons: {
            form: {
                gr: 'Επικαιροποίηση προφίλ',
                en: 'Update Profile'
            },
            pic: {
                gr: 'επεξεργασία',
                en: 'edit'
            }
        },
        alert: false,
        alertMsg: "",
        alertType: "error",
        alertRole: false,
        alertRoleMsg: "",
        alertRoleType: "error", 
        isLoading: false,
        pwDialog: {
            toggle: false,
            text: {
                gr: 'Είστε σίγουροι ότι θέλετε να αλλάξετε το κωδικό πρόσβασης;',
                en: 'Are you sure you want to reset your password?',
            },
            emailSent: false,
            emailText: {
                gr: '',
                en: '',
            }
        },
        picDialog: {
            toggle: false,
            text: {
                gr: 'Είστε σίγουροι ότι θέλετε να αλλάξετε το εικόνα προφίλ;',
                en: 'Are you sure you want to change your profile pic?'
            }
        },
        picToUploadBase64: null,
        picUploadDialog: {
            toggle: false,
            text: {
                gr: '',
                en: ''
            }
        },
        picTooBigDialog: {
            toggle: false,
            text: {
                gr: 'Η επιλεγμένη εικόνα προφίλ είναι πάνω από 500 KB.',
                en: 'The profile picture you selected is over 500 KB.'
            }
        }
    }
  },
  computed: {
    ...mapGetters(['getLang', 'getLanguages']),
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.alphaTick && errors.push(this.form.errors.firstName.invalid[this.getLang]);
      !this.$v.firstName.required && errors.push(this.form.errors.firstName.missing[this.getLang]);
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.alphaTick && errors.push(this.form.errors.lastName.invalid[this.getLang]);
      !this.$v.lastName.required && errors.push(this.form.errors.lastName.missing[this.getLang]);
      return errors;
    },
    nicknameErrors() {
      const errors = [];
      if (!this.$v.nickname.$dirty) return errors;
      !this.$v.nickname.required && errors.push(this.form.errors.nickname[this.getLang]);
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push(this.form.errors.email.invalid[this.getLang]);
      !this.$v.email.required && errors.push(this.form.errors.email.missing[this.getLang]);
      return errors;
    },
    bioErrors() {
        const errors = [];
        if (!this.$v.bio.$dirty) return errors;
        !this.$v.bio.maxLength && errors.push(this.form.errors.bio[this.getLang]);
        return errors;
    }
  },
  methods: {
    ...mapMutations(['setLang']),
    setLanguage(lang) {
        this.setLang(lang)
        if (process.isClient) {
            localStorage.setItem('lang', lang)
        }
    },
    setAlert(type) {
      if (type == "success") {
        this.alertMsg = this.getLang === 'gr' ? "Τα στοιχεία σας ενημερώθηκαν" : "Your personal details have been updated";
        this.alertType = "success";
      } else {
        this.alertMsg = this.getLang === 'gr' ? "Κάποιο λάθος συνέβη ενημερώνοντας τα στοιχεία σας" : "An error occured updating your personal details";
        this.alertType = "error";
      }
      const that = this
      function clearAlert() {
        that.alert = false
      }
      this.alert = true;
      setTimeout(clearAlert, 6000)
    },
    setAlertRole(type) {
      if (type == "success") {
        this.alertRoleMsg = this.getLang === 'gr' ? "Ο ρόλος σας ενημερώθηκε" : "Your role has been updated";
        this.alertRoleType = "success";
      } else {
        this.alertRoleMsg = this.getLang === 'gr' ? "Κάποιο λάθος συνέβη ενημερώνοντας το ρόλο σας" : "An error occured updating your role";
        this.alertRoleType = "error";
      }
      const that = this
      function clearAlert() {
        that.alertRole = false
      }
      this.alertRole = true;
      setTimeout(clearAlert, 6000)
    },
     clearUser() {
      if (process.isClient && this.$auth.user) {
        this.firstName = this.$auth.user.given_name || ''
        this.lastName = this.$auth.user.family_name || ''
        this.nickname = this.$auth.user.nickname || ''
        this.email = this.$auth.user.email || ''
        var userMetadata = this.getUserMetadata()
        if (userMetadata) {
            this.bio = userMetadata.bio || ''
        } else {
            this.bio = ''
        }
      } else {
        this.firstName = ''
        this.lastName = ''
        this.nickname = ''
        this.email = ''
        this.bio = ''
      }
    },
    getUserMetadata() {
        if (process.isClient) {
            return JSON.parse(localStorage.getItem('user_metadata'))
        } else {
            return {}
        }
    },
    setUserRole(roleObj) {
        if (process.isClient) {
            this.$auth.userRole = roleObj
            localStorage.setItem('userRole', JSON.stringify(roleObj))
        }
    },
    getUserRole() {
        if (process.isClient) {
            return JSON.parse(localStorage.getItem('userRole'))
        } else {
            return {}
        }
    },
    getUserRoleName() {
        if (process.isClient) {
            var roles = JSON.parse(localStorage.getItem('userRole')) || []
            if (roles.length > 0)
                return roles[0].name
            return ''
        } else {
            return ''
        }
    },
    clearRole() {
      if (this.getUserRole()) {
        this.role = this.getUserRoleName() || ''
      } else {
        this.role = ''
      }
    },
    updateRole(roleObj) {
        this.setUserRole(roleObj)
        this.role = roleObj[0].name
    },
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (process.isClient) {
            var data = {}
            if (this.$auth.user) {
                var nameUpdate = false
                if (this.firstName !== this.$auth.user.given_name) {
                    data.given_name = this.firstName
                    nameUpdate = true
                }
                if (this.lastName !== this.$auth.user.family_name) {
                    data.family_name = this.lastName
                    nameUpdate = true
                }
                if (this.nickname !== this.$auth.user.nickname) {
                    data.nickname = this.nickname
                }
                if (this.email !== this.$auth.user.email) {
                    data.email = this.email
                    data.email_verified = false
                    data.verify_email = true
                }
                if (nameUpdate) {
                    data.name = this.firstName + ' ' + this.lastName
                }
            }
            if (!this.$auth.user_metadata || this.bio !== this.$auth.user_metadata.bio) {
                if (!Object.prototype.hasOwnProperty.call(data, "user_metadata")) {
                    data.user_metadata = {}
                }
                data.user_metadata.bio = this.bio
            }

            var dataChanged = Object.keys(data).length !== 0 && data.constructor === Object;
            var roleChanged = this.getUserRole() && this.role !== this.getUserRoleName();

            if (dataChanged || roleChanged) { // check that at least one has changed
                this.isLoading = true;
                var dataUpdated = null;
                // keep email in case it changed as after updateUser localStorage is updated!
                var oldEmail = this.$auth.user.email;
                var roleUpdated = { flag: null, obj: null };
                
                if (dataChanged) { // update if data changed
                    await this.$auth.updateUser(data)
                        .then(() =>  dataUpdated = true) // successfully updated data
                        .catch(() => dataUpdated = false) // updating data failed
                }
                if (roleChanged) { // update if role changed
                    await this.$auth.updateUserRole(this.role)
                        .then((roleObj) => {
                            roleUpdated.flag = true;
                            roleUpdated.obj = roleObj;
                        }) // successfully updated role
                        .catch(() => roleUpdated.flag = false) // updating role failed
                }

                if (dataUpdated  === true || roleUpdated.flag  === true) { // one of them at least successfully updated
                    var marketingData = {
                        email_address: oldEmail,
                        merge_fields: {}
                    }; // init with current email and empty merge_fields object
                    var status = ''; // status retrieved if member was found

                    await this.$marketing.getMember({ email_address: oldEmail })
                        .then(res => status = res.data.status) // member found
                        .catch(() => {})

                    if (status.length === 0) {
                        // member not found, create with new email (if changed) and add
                        // 'status_if_new' key with 'subscribed' value
                        // also add tags and role
                        marketingData.email_address = this.email; // different only if user changed it
                        marketingData.status_if_new = 'subscribed';
                        marketingData.tags = [this.getLang];
                        marketingData.merge_fields['ROLE'] = this.role;
                    }
                    if (dataUpdated === true) { // updated in auth service, update in marketing service as well
                        if (Object.prototype.hasOwnProperty.call(data, "given_name")) {
                            marketingData.merge_fields['FNAME'] = data.given_name;
                        }
                        if (Object.prototype.hasOwnProperty.call(data, "family_name")) {
                            marketingData.merge_fields['LNAME'] = data.family_name;
                        }
                        if (Object.prototype.hasOwnProperty.call(data, "email") && status.length > 0) {
                            // request to change email only if member found
                            marketingData.new_email_address = data.email; // == this.email
                            // include status required to change email
                            marketingData.status = status
                        }
                    } else if (dataUpdated === false) { // failed to update in auth service, alert
                        this.clearUser()
                        this.setAlert('error')
                    }
                    // updated in auth service, update in marketing service as well
                    if (roleUpdated.flag === true) {
                        marketingData.merge_fields['ROLE'] = this.role
                    } else if (roleUpdated.flag === false) { // not updated in auth service, alert
                        this.clearRole();
                        this.setAlertRole('error');
                    }
                    // Delete 'merge_fields' key if empty.
                    if (Object.keys(marketingData.merge_fields).length === 0) {
                        delete marketingData.merge_fields;
                    }
                    // Make call to Marketing Service
                    await this.$marketing.createOrUpdateMember(marketingData)
                        .finally(() => { // we don't care to show to users whether marketing update succeeded or failed
                            // show success
                            if (dataUpdated === true) {
                                this.clearUser()
                                this.setAlert('success')
                            }
                            if (roleUpdated.flag === true) {
                                this.updateRole(roleUpdated.obj)
                                this.setAlertRole('success')
                            }
                        });
                } else { // none of them updated 
                    if (dataUpdated == false) { // data failed to update
                        this.clearUser();
                        this.setAlert('error');
                    }
                    if (roleUpdated.flag == false) { // role failed to update
                        this.clearRole();
                        this.setAlertRole('error');
                    }
                }
                this.isLoading = false;
            }
        }
        this.$v.$reset()
      }
    },
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 1000));
    },
    changeProfilePicWrapper(e, ref) {
        const file = e.target.files[0]

        if (file) {
            if (file.size > 512 * 1024) {
                // Size is bigger than 500 KB
                this.picTooBigDialog.toggle = true
                // clear input
                ref.value = ''
                return
            }
            var reader = new FileReader();
            // Define a callback function to run, when FileReader finishes its job
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // Note: arrow function used here, so that "this.this.imageToUploadBase64" refers to the this.imageToUploadBase64 of Vue component
                // Read image as base64 and set to this.imageToUploadBase64
                this.picToUploadBase64 = e.target.result
                this.picDialog.toggle = true
                // clear input
                ref.value = ''
            }
        }
    },
    changeProfilePicDesktop(e) {
        this.changeProfilePicWrapper(e, this.$refs.picProfileDesktop)
    },
    changeProfilePicMobile(e) {
        this.changeProfilePicWrapper(e, this.$refs.picProfileMobile)
    },

    uploadProfilePic() {
        this.picDialog.toggle = false
        if (process.isClient) {
            this.$imgdb.updateProfilePic(this.$auth.user.sub, this.picToUploadBase64)
            .then(secureUrl => {
                this.$auth.updateUser({ picture: secureUrl })
                .then(() => {
                    this.picToUploadBase64 = null
                    this.pic = secureUrl
                    if (process.isClient) {
                        var getUser = JSON.parse(localStorage.getItem('user'))
                        getUser.picture = this.pic
                        localStorage.setItem('user', JSON.stringify(getUser))
                    }
                    this.picUploadDialog.text.en = "Your profile pic has been succesfully changed"
                    this.picUploadDialog.text.gr = "Η εικόνα προφίλ σας ενημερώθηκε επιτυχώς"
                    this.picUploadDialog.toggle = true
                })
                .catch(() => {
                    this.picToUploadBase64 = null
                    this.picUploadDialog.text.en = "An error occured while changing your profile pic. Please try again later"
                    this.picUploadDialog.text.gr = "Κάποιο σφάλμα προέκυψε ενημερώνοντας την εικόνα προφίλ σας. Παρακαλώ προσπαθήστε ξανά αργότερα"
                    this.picUploadDialog.toggle = true
                    // Should retry maybe to update profile pic url to auth0.
                })
            })
            .catch(() => {
                this.picToUploadBase64 = null
                this.picUploadDialog.text.en = "An error occured while changing your profile pic. Please try again later"
                this.picUploadDialog.text.gr = "Κάποιο σφάλμα προέκυψε ενημερώνοντας την εικόνα προφίλ σας. Παρακαλώ προσπαθήστε ξανά αργότερα"
                this.picUploadDialog.toggle = true
            })
        }
    },
    cancelUploadProfilePic() {
        this.picDialog.toggle = false
        this.picToUploadBase64 = null
    },
    resetPasswordEmail() {
        this.pwDialog.toggle = false
        if (process.isClient) {
            this.$auth.resetPassword()
            .then(() => {
                this.pwDialog.emailText.en = 'An email with instructions will be sent shortly to ' + this.email
                this.pwDialog.emailText.gr = 'Ένα email με πληροφορίες θα σταλεί σε λίγο στην διεύθυνση ' + this.email
                this.pwDialog.emailSent = true
            }).catch(() => {
                this.pwDialog.emailText.en = 'An error has occured'
                this.pwDialog.emailText.gr = 'Κάποιο σφάλμα προέκυψε'
                this.pwDialog.emailSent = true
            })
        }
    },
    unsetPwDialogEmail() {
        this.pwDialog.emailSent = false
        this.pwDialog.emailText.en = ''
        this.pwDialog.emailText.gr = ''
    }
  },
  metaInfo () {
    return {
      titleTemplate: this.getLang === 'gr' ? 'Ρυθμίσεις — Artventures' : 'Settings — Artventures',
      meta: [
        { name: 'description', content: 'Web Application' },
      ],
    }
  },
}
</script>

<style scoped>
@import '../../assets/style/lds-ring.css';

.theme--light.v-label {
    color: rgba(26, 26, 26, 1) !important;
}
.pic-btn {
    border-radius: 4px;
    cursor: pointer;
    background-color: #333333;
}
.v-messages__message {
  font-family: 'Raleway', sans-serif !important;
}

.settings-alert-block {
  width: 50vw;
  margin-right: 25vw;
  margin-left: 25vw;
}
</style>