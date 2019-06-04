const unitSpeeds = {
    spear: 14,
    sword: 18,
    axe: 14,
    archer: 14,
    light_cavalry: 8,
    mounted_archer: 8,
    heavy_cavalry: 9,
    ram: 24,
    catapult: 24,
    doppelsoldner: 14,
    trebuchet: 50,
    snob: 35,
    knight: 8
};

const unitNames = {
    spear: 'spear',
    sword: 'sword',
    axe: 'axe',
    archer: 'archer',
    light_cavalry: 'light_cavalry',
    mounted_archer: 'mounted_archer',
    heavy_cavalry: 'heavy_cavalry',
    ram: 'ram',
    catapult: 'catapult',
    berserker: 'doppelsoldner',
    trebuchet: 'trebuchet',
    noble: 'snob',
    paladin: 'knight'
};

function calculateDistance(source, target) {
    let dx = source.x - target.x;
    let dy = source.y - target.y;

    if (dy % 2) {
        dx += source.y % 2 ? 0.5 : -0.5;
    }

    return Math.sqrt(dx * dx + dy * dy * 0.75);
}

function calculateBaseTravelPeriod(unit, worldSpeed) {
    let baseUnitSpeed = unitSpeeds[unitNames[unit]];
    return (baseUnitSpeed / worldSpeed * 60) * 100 / 100; // in seconds
}

function calculateTravelPeriod(source, target, unit, worldSpeed) {
    let travelPeriod = calculateDistance(source, target) * calculateBaseTravelPeriod(unit, worldSpeed);
    return travelPeriod;
}

function calculateLaunchDate(source, target, unit, worldSpeed, landingTime) {
    let travelPeriod = calculateTravelPeriod(source, target, unit, worldSpeed);
    let d = new Date(landingTime - travelPeriod * 1000);
    return d;
}

module.exports = function (
    source, target,
    landingTime,
    commandType, slowestUnit, worldSpeed,
    attackModifiers, supportModifiers,
    isClearingNuke
) {
    let unit = slowestUnit;
    if (commandType === 'attack') {
        // apply attack modifier
        if (attackModifiers != null) {
            unit = attackModifiers.deceiver ? 'noble' : slowestUnit;
        }
    } else if (commandType === 'support') {
        // apply support modifier
        if (supportModifiers != null) {
            if (supportModifiers.tactician) {
                worldSpeed = parseInt(worldSpeed) * 2;
            }
        }
    }

    let launchDate = calculateLaunchDate(source, target, unit, worldSpeed, landingTime);
    if (commandType === 'attack') {
        // clearing nuke
        if ((isClearingNuke) && (unit != 'noble')) {
            launchDate.setSeconds(launchDate.getSeconds() - 2);
        }
        // normal attack
        if ((!isClearingNuke) && (unit != 'noble')) {
            launchDate.setSeconds(launchDate.getSeconds() - 1);
        }
    } else if (commandType === 'support') {
        launchDate.setSeconds(launchDate.getSeconds() + 1);
        if (supportModifiers != null) {
            if (supportModifiers.onTime) {
                // undo modification
                launchDate.setSeconds(launchDate.getSeconds() - 1);
            }
        }
    }
    return launchDate;
};
