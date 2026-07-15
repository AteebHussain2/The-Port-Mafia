import { Icon, FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, XLogoIcon, ThreadsLogoIcon } from "@phosphor-icons/react";
import { initiateLinkedInAuth } from "@/actions/connect-apps";
import { APPTYPE } from "@/lib/enums";

export type connectedApp = {
    id: string,
    name: string,
    icon: Icon,
    enable: boolean,
    colors: {
        bg: string,
        text: string,
        logo: string,
        button: string,
    },
    connectAction?: () => void;
}

const connectedApps: connectedApp[] = [
    {
        id: APPTYPE.LINKEDIN,
        name: "LinkedIn",
        icon: LinkedinLogoIcon,
        enable: true,
        colors: {
            bg: "bg-[#0C67C4]/5 hover:bg-[#0C67C4]/10!",
            text: "group-hover:text-[#0C67C4] group-hover:text-foreground!",
            logo: "group-hover:fill-[#0C67C4] fill-[#0C67C4] group-hover:text-foreground!",
            button: "hover:bg-[#0C67C4]/80! rounded-sm!"
        },
        connectAction: initiateLinkedInAuth
    },
    {
        id: APPTYPE.X,
        name: "X",
        icon: XLogoIcon,
        enable: false,
        colors: {
            bg: "bg-[#000000]/15",
            text: "group-hover:text-[#]!",
            logo: "group-hover:text-[#]! text-muted-foreground!",
            button: "hover:bg-[#000000]/40!"
        }
    },
    {
        id: APPTYPE.INSTAGRAM,
        name: "Instagram",
        icon: InstagramLogoIcon,
        enable: false,
        colors: {
            bg: "bg-[#E34158]/5",
            text: "group-hover:text-[#]!",
            logo: "group-hover:text-[#]! text-muted-foreground!",
            button: "hover:bg-[#]/80!"
        }
    },
    {
        id: APPTYPE.FACEBOOK,
        name: "Facebook",
        icon: FacebookLogoIcon,
        enable: false,
        colors: {
            bg: "bg-[#1877F2]/5",
            text: "group-hover:text-[#]!",
            logo: "group-hover:text-[#]! text-muted-foreground!",
            button: "hover:bg-[#]/80!"
        }
    },
    {
        id: APPTYPE.THREADS,
        name: "Threads",
        icon: ThreadsLogoIcon,
        enable: false,
        colors: {
            bg: "bg-[#000000]/10",
            text: "group-hover:text-[#]!",
            logo: "group-hover:text-[#]! text-muted-foreground!",
            button: "hover:bg-[#]/80!"
        }
    },
];

export default connectedApps as connectedApp[];