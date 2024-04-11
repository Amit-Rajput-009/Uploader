export const sidebarUserLinks = [
    {
        icon: '../assets/icons/storage.svg',
        label: 'Storage',
        to: '/storage'
    },
    {
        icon: '../assets/icons/Request.svg',
        label: 'Requests',
        to: '/requests'
    },
    {
        icon: '../assets/icons/EditProfile.svg',
        label: 'Profile',
        to: '/profile'
    },
    {
        icon: '../assets/icons/ContactAdmin.svg',
        label: 'Contact admin',
        to: '/contact-admin'
    },
    {
        icon: '../assets/icons/Bell.svg',
        label: 'Notification',
        to: '/notification'
    },
    {
        icon: '../assets/icons/log-file.svg',
        label: 'Logs',
        to: '/logs'
    },
];
export const sidebarAdminLinks = [
    {
        icon: '../assets/icons/Request.svg',
        label: 'Requests',
        to: '/requests'
    },
    {
        icon: '../assets/icons/EditProfile.svg',
        label: 'Profile',
        to: '/profile'
    },
    {
        icon: '../assets/icons/AddUser.svg',
        label: 'Create User',
        to: '/create-user'
    },
    {
        icon: '../assets/icons/Bell.svg',
        label: 'Notification',
        to: '/notification'
    },
    {
        icon: '../assets/icons/log-file.svg',
        label: 'Logs',
        to: '/logs'
    },
];

export type registerForm = {
    adminEmail : string,
    userEmail : string,
    password : string,
    role : string
}

export const fileCetegory = [
    {
        value: "",
        label: "cetegories"
    },
    {
        value: "pdf",
        label: "PDF"
    },
    {
        value: "excel",
        label: "Excel"
    },
    {
        value: "image",
        label: "Image"
    },
    {
        value: "word",
        label: "Docs"
    },
    {
        value: "misc",
        label: "Other"
    },
]

export interface TreeNode {
    _id:string;
    name: string;
    isFolder: boolean;
    children?: TreeNode[];
    url?: string;
    fileType?: string;
    isExpanded?: boolean; 
  }