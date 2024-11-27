import { useMediaQuery } from '@mantine/hooks';

export const useResponsive = () => {
    const isBigScreen = useMediaQuery('(min-width: 1250px, max-width: 1297px)')
    const expandBar = useMediaQuery('( min-width: 1250px)');
    const isBp0 = useMediaQuery('( max-width: 1245px)');
    const isBp1 = useMediaQuery('( max-width: 1172px)');
    // const isBp1 = useMediaQuery('( min-width: 1211, max-width: 1250)');
    // const isBp2 = useMediaQuery('( min-width: 1177, max-width: 1211)');
    const isBp2 = useMediaQuery('(max-width: 1216px)');
    // const isBp3 = useMediaQuery('( min-width: 1153, max-width: 1177)');
    const isBp3 = useMediaQuery('( max-width: 1115px)');
    // const isBp4 = useMediaQuery('( min-width: 1147, max-width: 1153)');
    const isBp4 = useMediaQuery('( max-width: 1046px)');
    // const isBp5 = useMediaQuery('( min-width: 1123, max-width: 1147)');
    const isBp5 = useMediaQuery('( max-width: 1019px)');
    // const isBp6 = useMediaQuery('( min-width: 1060, max-width: 1123)');
    const isBp6 = useMediaQuery('( max-width: 1016px)');
    // const isBp7 = useMediaQuery('( min-width: 998, max-width: 1060)');
    const isBp7 = useMediaQuery('( max-width: 968px)');
    // const isBp8 = useMediaQuery('( min-width: 947, max-width: 998)');
    const isBp8 = useMediaQuery('( max-width: 931px)');
    const isBp9 = useMediaQuery('( max-width: 637px)');
    const isBp10 = useMediaQuery('( max-width: 780px)');
   
    const isBp11 = useMediaQuery('( max-width: 1250px)');
    const isBp12 = useMediaQuery('( max-width: 673px)');
    const isBp13 = useMediaQuery('( max-width: 443px)');
    const isBp14 = useMediaQuery('( max-width: 442px)');
    const isBp15 = useMediaQuery('( max-width: 397px)');
    const isBp16 = useMediaQuery('( max-width: 372px)');
    const isBp17 = useMediaQuery('( max-width: 578px)');
    const isBp18 = useMediaQuery('( max-width: 455px)');
    const isBp19 = useMediaQuery('( max-width: 383px)');
    const isBp20 = useMediaQuery('( max-width: 412px)');
    const isBp21 = useMediaQuery('( max-width: 788px)');
    const isBp22 = useMediaQuery('( max-width: 677px)');
    const isBp23 = useMediaQuery('( max-width: 549px)');
    const isBp24 = useMediaQuery('( max-width: 423px)');
    const isBp25 = useMediaQuery('( max-width: 386px)');
    const isBp26 = useMediaQuery('( max-width: 832px)');
    const isBp27 = useMediaQuery('( max-width: 738px)');
    const isBp28 = useMediaQuery('( max-width: 565px)');
    const isBp29 = useMediaQuery('( max-width: 1300px)');



    const isAdaptableScreen = useMediaQuery('( min-width: 947)');
    const isSmallScreen = useMediaQuery('( max-width: 722)');
    const onWholeScreen = useMediaQuery('( max-width: 1200)');
    // const  = useMediaQuery(() max-width: 1147));
    
    const isSmallerScreen = useMediaQuery('( min-width: 659, max-width: 937)');
    const isMobileScreen = useMediaQuery('( min-width: 455, max-width: 659)');
    const isMicroScreen = useMediaQuery('( min-width: 300, max-width: 376)');

    return {
        expandBar,
        isBp0,
        isBp1,
        isBp2,
        isBp3,
        isBp4,
        isBp5,
        isBp6,
        isBp7,
        isBp8,
        isBp9,
        isBp10,
        isBp11,
        isBp12,
        isBp13,
        isBp14,
        isBp15,
        isBp16,
        isBp17,
        isBp18,
        isBp19,
        isBp20,
        isBp21,
        isBp22,
        isBp23,
        isBp24,
        isBp25,
        isBp26,
        isBp27,
        isBp28,
        isBp29,
        isAdaptableScreen,
        onWholeScreen,
        isBigScreen,
        isSmallScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    };
};