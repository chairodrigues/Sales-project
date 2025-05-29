import appconst from '@/lib/appconst'

export default {
  install (Vue) {
    Vue.prototype.$L = function (value, source, ...argus) {
      if (source) {
        return window.abp.localization.localize(
          value, source, argus
        )
      } else {
        return window.abp.localization.localize(
          value, appconst.localization.defaultLocalizationSourceName, argus
        )
      }
    },
      Vue.prototype.hasPermission = function (permissionName) {
        return window.abp.auth.hasPermission(permissionName);
      },
      Vue.prototype.hasAnyOfPermissions = function (...argus) {
        return window.abp.auth.hasAnyOfPermissions(...argus);
      },
      Vue.prototype.hasAllOfPermissions = function (...argus) {
        return window.abp.auth.hasAllOfPermissions(...argus);
      }
  }
}