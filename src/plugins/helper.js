"use strict"
import Vue from 'vue'
    const Helper = {
        install(Vue) {
            Vue.prototype.appName = process.env.VUE_APP_NAME
            //get image
            Vue.prototype.getImage = function (image){
                if(image!=null && image.length>0){
                    // return process.env.VUE_APP_BACKEND_URL + "/images"+ image
                    return process.env.VUE_APP_API_PUBLIC_PATH+process.env.VUE_APP_IMAGES+ image
                }
                // return "/img/unavailable.png"
                return process.env.VUE_APP_API_PUBLIC_PATH+process.env.VUE_APP_IMAGES_DEFAULT
            }
           
        }
    }
Vue.use(Helper)