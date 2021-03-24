function getRoles() {
    return [
        {value: "ROLE_SUPER_ADMIN", label: "Super administrateur", isFixed: true},
        {value: "ROLE_ADMIN", label: "Administrateur", isFixed: true},
        {value: "ROLE_TEAM", label: "Utilisateur interne", isFixed: false},
        {value: "ROLE_USER", label: "Utilisateur externe", isFixed: false},
    ];
}

function filterRoles(roles) {
    if (roles.length >= 1) {
        return roles.includes("ROLE_SUPER_ADMIN") ? "ROLE_SUPER_ADMIN" : 
               roles.includes("ROLE_ADMIN") ? "ROLE_ADMIN" :
               roles.includes("ROLE_TEAM") ? "ROLE_TEAM" : "ROLE_USER";
    }
    return "ROLE_USER";
}

function hasPrivileges(user)
{
    return ["ROLE_SUPER_ADMIN", "ROLE_ADMIN"].includes(user.roles);
}

function getDefaultRole() {
    return "ROLE_USER";
}

export default {
    getRoles,
    filterRoles,
    hasPrivileges,
    getDefaultRole
}