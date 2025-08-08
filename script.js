document.addEventListener('DOMContentLoaded', () => {

    // --- DATA & CONSTANTS ---
    const AREA_INFO = {
      warehouse: { title: "Warehouse Facility", icon: 'Building', specs: [{ label: "Dimensions", value: "125m (W) x 55m (D)" }, { label: "Total Area", value: "6,875 m²" }, { label: "Compliance", value: "Meets < 7,500m² requirement" },], features: ["Primary storage for heritage & contemporary collections.", "Designed for efficient racking and internal logistics flow."] },
      docking: { title: "Docking Area & Truck Apron", icon: 'Truck', specs: [{ label: "Dimensions", value: "125m (W) x 35m (D)" }, { label: "Total Area", value: "4,375 m²" }, { label: "Pavement", value: "Reinforced Concrete (Mác 300, 250mm thick)" }, { label: "Drainage", value: "1-2% slope towards main road" },], features: ["Sole zone for all truck maneuvering and queuing.", "Primary North-face fire access lane.", "Individual reinforced landing gear pads (3m wide, 300mm thick) at each dock door."] },
      docksystems: { title: "Loading Dock Systems & Equipment", icon: 'Layers', specs: [{ label: "Total Bays", value: "8 (4 Inbound, 4 Outbound)" }, { label: "Door Type", value: "Insulated Steel Sectional (2.7m x 3.0m)" }, { label: "Leveler Type", "value": "Vertical Storing Hydraulic (18,000 kg cap.)" }, { label: "Shelter Type", value: "Inflatable Dock Shelters" }, { label: "Restraint System", value: "Rotating Hook Automatic (14,500 kg force)" }, { label: "Control System", value: "Integrated Interlocked Control Panel" },], features: ["Vertical storing levelers ensure a perfect environmental seal and superior cleanliness.", "Inflatable shelters accommodate a wide variety of truck sizes.", "Interlocked controls prevent accidental separation and ensure a safe operational sequence."] },
      garage: { title: "Garage & Parking", icon: 'ParkingCircle', specs: [{ label: "Dimensions", value: "10m (W) x 40m (D)" }, { label: "Total Area", value: "400 m²" }, { label: "Capacity", value: "5 Cars, 50 Motorbikes" },], features: ["Covered parking for motorbikes.", "2 dedicated EV charging stations.", "Clearly demarcated pedestrian and vehicle lanes."] },
      utility: { title: "Utility Compound", icon: 'ShieldCheck', specs: [{ label: "Dimensions", value: "10m (W) x 20m (D)" }, { label: "Total Area", value: "200 m²" }, { label: "Safety", "value": "Secured with perimeter fencing" },], features: ["Houses main electrical substation.", "Contains backup power generator.", "Location of fire water pump house and tank."] }
    };
      
    const ICONS = {
      X: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
      Ruler: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L3 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/></svg>',
      Wind: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>',
      Building: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
      Truck: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>',
      Layers: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.84l8.57 3.92a2 2 0 0 0 1.66 0l8.57-3.92a1 1 0 0 0 0-1.84Z"/><path d="m22 17.65-8.57 3.92a2 2 0 0 1-1.66 0L3.2 17.65"/><path d="m22 12.65-8.57 3.92a2 2 0 0 1-1.66 0L3.2 12.65"/></svg>',
      ParkingCircle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>',
      ShieldCheck: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>',
      Video: '<svg stroke-width="2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>',
      Lamp: '<svg stroke-width="2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2h8l4 10H4L8 2Z"/><path d="M12 12v10"/><path d="M8 22h8"/></svg>',
      Flame: '<svg stroke-width="2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-1.12-2.5-2.5-2.5-1.4 0-2.5 1.12-2.5 2.5 0 1.38 1.12 2.5 2.5 2.5z"/><path d="M14.5 14.5A2.5 2.5 0 0 0 17 12c0-1.38-1.12-2.5-2.5-2.5-1.4 0-2.5 1.12-2.5 2.5 0 1.38 1.12 2.5 2.5 2.5z"/><path d="M12 2c-3 3-6 6-6 9a6 6 0 0 0 12 0c0-3-3-6-6-9z"/></svg>',
      ArrowRight: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
      Trees: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/></svg>',
    };
  
    const H = { westBuffer: 1/150*100, westBlock: 10/150*100, westFirelane: 8/150*100, mainBuilding: 125/150*100, eastFirelane: 5/150*100, eastBuffer: 1/150*100 };
    const V = { topGap: 4/100*100, docking: 35/100*100, warehouse: 55/100*100, southLane: 6/100*100, garage: 40/100*100, utilityGap: 1/100*100, utility: 20/100*100, westTopGap: 36/100*100 };
    const cameraPositions = [{ top: '3%', left: '11%' }, { top: '3%', right: '11%' }, { top: '38%', left: '19.5%' }, { top: '38%', right: '6.5%' }, { top: '94%', left: '19.5%' }, { top: '94%', right: '6.5%' }, { top: '50%', left: '5%' }];
    const lightPositions = [{ top: '15%', left: '30%' }, { top: '15%', left: '55%' }, { top: '15%', left: '80%' }, { top: '30%', left: '30%' }, { top: '30%', left: '55%' }, { top: '30%', left: '80%' }, { top: '60%', left: '5%' }, { top: '96%', left: '50%' }];
    const hydrantPositions = [{ top: '6%', left: '15.5%' }, { top: '6%', right: '8.5%' }, { bottom: '8%', left: '15.5%' }, { bottom: '8%', right: '8.5%' }];
  
    let showDimensions = true;
    let showTraffic = true;
    let showDetails = true;
    
    const friendlyViewContainer = document.getElementById('friendly-view-container');
    const infoModal = document.getElementById('info-modal');
  
    const openModal = (area) => {
        const data = AREA_INFO[area];
        if (!data) return;
        const specsHTML = data.specs.map(spec => `<div><p class="text-xs text-gray-500 font-semibold uppercase tracking-wider">${spec.label}</p><p class="text-base font-medium">${spec.value}</p></div>`).join('');
        const featuresHTML = data.features.map(feature => `<li class="text-sm text-gray-600">${feature}</li>`).join('');
        const modalIconHTML = `<div class="w-6 h-6 text-blue-600">${ICONS[data.icon] || ''}</div>`;
        infoModal.innerHTML = `<div id="modal-content" class="bg-white rounded-lg shadow-2xl w-full max-w-lg text-gray-800 border border-gray-300"><div class="flex justify-between items-center p-4 border-b border-gray-200"><div class="flex items-center gap-3">${modalIconHTML}<h3 class="text-lg font-bold">${data.title}</h3></div><button data-action="close-modal" class="p-1 rounded-full hover:bg-gray-100">${ICONS.X.replace('<svg', '<svg class="w-5 h-5"')}</button></div><div class="p-6"><div class="grid grid-cols-2 gap-4 mb-6">${specsHTML}</div><ul class="space-y-2 list-disc list-inside">${featuresHTML}</ul></div></div>`;
        infoModal.classList.remove('hidden');
    };
    const closeModal = () => { infoModal.innerHTML = ''; infoModal.classList.add('hidden'); };
    
    // MODIFIED: Renders a clean, styled dimension line with notations.
    const getDimensionLineHTML = (options) => {
        const { orientation, length, position, label, offset = '0', labelOffset = '0' } = options;

        const lineContainerStyle = orientation === 'horizontal' 
            ? `height: 1px; width: ${length}; top: ${offset}; left: ${position};` 
            : `width: 1px; height: ${length}; left: ${offset}; top: ${position};`;

        const tickStyle = orientation === 'horizontal' ? 'h-3 w-px' : 'w-3 h-px';

        const labelStyle = orientation === 'horizontal'
            ? `left: 50%; top: ${labelOffset}; transform: translate(-50%, -50%);`
            : `top: 50%; left: ${labelOffset}; transform: translate(-50%, -50%) rotate(-90deg);`;

        const startTickStyle = orientation === 'horizontal' ? `top: 50%; left: 0; transform: translateY(-50%);` : `top: 0; left: 50%; transform: translateX(-50%);`;
        const endTickStyle = orientation === 'horizontal' ? `top: 50%; right: 0; transform: translateY(-50%);` : `bottom: 0; left: 50%; transform: translateX(-50%);`;

        return `
            <div style="${lineContainerStyle}" class="absolute">
                <div class="absolute w-full h-full bg-gray-400"></div>
                <div class="absolute ${tickStyle} bg-gray-400" style="${startTickStyle}"></div>
                <div class="absolute ${tickStyle} bg-gray-400" style="${endTickStyle}"></div>
                <span class="absolute text-[10px] font-mono px-1 text-gray-600" style="${labelStyle}">${label}</span>
            </div>
        `;
    };

    // MODIFIED: Implements a full set of clear, blueprint-style dimensions.
    const getAllDimensionsHTML = () => {
        const lines = [
            // --- HORIZONTAL DIMENSIONS (TOP) ---
            // Tier 1: Overall Width
            getDimensionLineHTML({ orientation: "horizontal", length: "100%", position: "0%", label: "150m", offset: "-24px", labelOffset: "-6px" }),
            // Tier 2: Main Segments
            getDimensionLineHTML({ orientation: "horizontal", length: `calc(12/150*100%)`, position: "0%", label: "12m", offset: "-12px", labelOffset: "-6px" }),
            getDimensionLineHTML({ orientation: "horizontal", length: `${H.mainBuilding}%`, position: `calc(12/150*100%)`, label: "125m", offset: "-12px", labelOffset: "-6px" }),
            
            // --- CENTRAL LINE (between gates) ---
            getDimensionLineHTML({ orientation: "horizontal", length: `calc(126/150 * 100%)`, position: `calc(12/150*100%)`, label: "125m", offset: '2%', labelOffset: '12px' }),

            // --- VERTICAL DIMENSIONS (LEFT) ---
            getDimensionLineHTML({ orientation: "vertical", length: `${V.westTopGap}%`, position: `0%`, label: "36m", offset: "-12px", labelOffset: "-6px" }),
            getDimensionLineHTML({ orientation: "vertical", length: `${V.garage}%`, position: `${V.westTopGap}%`, label: "40m", offset: "-12px", labelOffset: "-6px" }),
            
            // --- VERTICAL DIMENSIONS (RIGHT) ---
            getDimensionLineHTML({ orientation: "vertical", length: `${V.topGap}%`, position: `0%`, label: "4m", offset: "calc(100% + 12px)", labelOffset: "6px" }),
            getDimensionLineHTML({ orientation: "vertical", length: `${V.docking}%`, position: `${V.topGap}%`, label: "35m", offset: "calc(100% + 12px)", labelOffset: "6px" }),
            getDimensionLineHTML({ orientation: "vertical", length: `${V.warehouse}%`, position: `${V.topGap + V.docking}%`, label: "55m", offset: "calc(100% + 12px)", labelOffset: "6px" }),
            getDimensionLineHTML({ orientation: "vertical", length: `${V.southLane}%`, position: `${V.topGap + V.docking + V.warehouse}%`, label: "6m", offset: "calc(100% + 12px)", labelOffset: "6px" }),
        ];
        return lines.join('');
    };

    const getMapIconHTML = (icon, position, colorClass) => {
        const positionStyle = Object.entries(position).map(([key, value]) => `${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}: ${value};`).join(' ');
        const iconSVG = ICONS[icon].replace('<svg', `<svg class="w-3 h-3 ${colorClass}"`);
        return `<div class="absolute w-5 h-5 rounded-full flex items-center justify-center bg-white border border-gray-300 -translate-x-1/2 -translate-y-1/2" style="${positionStyle}">${iconSVG}</div>`;
    };
    
    const getDockBayHTML = (i) => {
        const totalBays = 8;
        const bayWidthPct = 3.5;
        const wallStart = H.westBuffer + H.westBlock + H.westFirelane;
        const wallWidth = H.mainBuilding;
        const totalBayWidth = bayWidthPct * totalBays;
        const totalGaps = totalBays + 1;
        const gapPct = (wallWidth - totalBayWidth) / totalGaps;
        const leftPos = wallStart + gapPct + i * (bayWidthPct + gapPct);
        const topPos = V.topGap + V.docking - 2.5;
        return `<div data-area="docksystems" class="absolute bg-gray-400 cursor-pointer" style="top: ${topPos}%; left: ${leftPos}%; width: ${bayWidthPct}%; height: 2.5%;"></div>`;
    };

    const getTrafficFlowHTML = () => {
        const arrow = (style, rotationClass = '') => `<div class="absolute text-gray-600 opacity-80 ${rotationClass}" style="${style}">${ICONS.ArrowRight.replace('<svg', '<svg class="w-6 h-6"')}</div>`;
        return [
            // Entry flow
            arrow('top: 8%; left: 10%; transform: rotate(90deg);'),
            arrow('top: 20%; left: 10%; transform: rotate(90deg);'),
            // Apron flow (left to right)
            arrow('top: 25%; left: 20%;'),
            arrow('top: 25%; left: 35%;'),
            arrow('top: 25%; left: 58%;'),
            arrow('top: 25%; left: 82%;'),
            // Inbound docking maneuvers
            arrow('top: 32%; left: 30%; transform: rotate(90deg);'),
            arrow('top: 32%; left: 40%; transform: rotate(90deg);'),
            // Outbound docking maneuvers
            arrow('top: 32%; left: 65%; transform: rotate(90deg);'),
            arrow('top: 32%; left: 75%; transform: rotate(90deg);'),
            // Exit flow
            arrow('top: 18%; left: 88%; transform: rotate(-90deg);'),
            arrow('top: 6%; left: 88%; transform: rotate(-90deg);'),
        ].join('');
    };
    
    const getLegendIconHTML = (iconName, iconColorClass) => {
        const iconSVG = ICONS[iconName].replace('<svg', `<svg class="w-3 h-3 ${iconColorClass}"`);
        return `<div class="relative w-5 h-5 rounded-full flex items-center justify-center bg-white border border-gray-300">${iconSVG}</div>`;
    };

    const getLegendHTML = () => {
        const legendItem = (iconName, text, iconColorClass) => `<div class="flex items-center gap-2">${getLegendIconHTML(iconName, iconColorClass)}<span class="text-xs text-gray-600">${text}</span></div>`;
        return `<div class="bg-gray-100 p-3 rounded-lg border border-gray-200 shadow-sm"><h4 class="font-bold text-sm mb-2 text-gray-700">Legend</h4><div class="flex flex-col gap-2">${legendItem('Video', 'Security Camera', 'text-gray-600')}${legendItem('Lamp', 'Exterior Lighting', 'text-amber-600')}${legendItem('Flame', 'Fire Hydrant', 'text-red-600')}</div></div>`;
    };

    const getControlHeaderHTML = () => {
        const button = (action, area, icon, text) => `<button data-action="${action}" data-area="${area}" class="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 text-gray-900 bg-gray-200 hover:bg-gray-300 border border-gray-400"><div class="w-4 h-4">${icon}</div> ${text}</button>`;
        return `<div class="bg-white p-2 rounded-lg border border-gray-300"><div class="flex flex-col gap-2"><div><h4 class="font-bold text-sm mb-2 text-gray-700">Toggle Layers</h4><div class="flex flex-wrap gap-2">${button('toggle-dimensions', '', ICONS.Ruler, 'Dimensions')}${button('toggle-traffic', '', ICONS.Wind, 'Traffic')}${button('toggle-details', '', ICONS.Layers, 'Details')}</div></div><div><h4 class="font-bold text-sm mb-2 text-gray-700">View Details</h4><div class="flex flex-wrap gap-2">${button('', 'warehouse', ICONS.Building, 'Warehouse')}${button('', 'docksystems', ICONS.Layers, 'Dock Systems')}${button('', 'garage', ICONS.ParkingCircle, 'Garage')}${button('', 'utility', ICONS.ShieldCheck, 'Utility')}</div></div></div></div>`;
    };

    const updateSitemapLayers = () => {
        const dimensionsLayer = document.getElementById('sitemap-dimensions-layer');
        const trafficLayer = document.getElementById('sitemap-traffic-layer');
        const detailsLayer = document.getElementById('sitemap-details-layer');
        if (!dimensionsLayer || !trafficLayer || !detailsLayer) return;

        dimensionsLayer.innerHTML = showDimensions ? getAllDimensionsHTML() : '';
        trafficLayer.innerHTML = showTraffic ? getTrafficFlowHTML() : '';
        detailsLayer.innerHTML = showDetails ? `${cameraPositions.map(pos => getMapIconHTML('Video', pos, 'text-gray-600')).join('')}${lightPositions.map(pos => getMapIconHTML('Lamp', pos, 'text-amber-600')).join('')}${hydrantPositions.map(pos => getMapIconHTML('Flame', pos, 'text-red-600')).join('')}` : '';
        
        document.querySelector('[data-action="toggle-dimensions"]').classList.toggle('bg-cyan-400', showDimensions);
        document.querySelector('[data-action="toggle-traffic"]').classList.toggle('bg-cyan-400', showTraffic);
        document.querySelector('[data-action="toggle-details"]').classList.toggle('bg-cyan-400', showDetails);
    };
    
    const renderSidebar = () => {
        const sidebarContainer = document.getElementById('sidebar-container');
        if (!sidebarContainer) return;
        sidebarContainer.innerHTML = `<div class="flex flex-col space-y-4"><h2 class="text-xl font-bold text-gray-800">Controls</h2>${getControlHeaderHTML()}<div class="border-t border-gray-200 my-4"></div>${getLegendHTML()}</div>`;
    };
      
    const renderSitePlan = () => {
        friendlyViewContainer.innerHTML = `
            <div class="w-full bg-gray-50 pt-4 sm:pt-8 flex flex-col items-center font-sans">
                <div class="w-full max-w-7xl mx-auto px-4 sm:px-8">
                    <div id="sitemap" class="w-full aspect-[150/100] relative border-2 border-gray-300 bg-white">
                        <div class="absolute top-0 left-0 h-full bg-green-100" style="width: ${H.westBuffer}%"></div><div class="absolute top-0 right-0 h-full bg-green-100" style="width: ${H.eastBuffer}%"></div><div class="absolute bottom-0 left-0 w-full bg-green-100" style="height: calc(1/6 * ${V.southLane}%)"></div>
                        <div class="absolute bottom-1 left-2 w-5 h-5 text-green-600 opacity-70">${ICONS.Trees}</div><div class="absolute bottom-1 right-2 w-5 h-5 text-green-600 opacity-70">${ICONS.Trees}</div>
                        <div data-area="docking" class="absolute bg-gray-200 cursor-pointer" style="top: ${V.topGap}%; left: ${H.westBuffer + H.westBlock + H.westFirelane}%; width: ${H.mainBuilding}%; height: ${V.docking}%"><span class="absolute top-[15%] left-1/2 -translate-x-1/2 text-gray-500 font-semibold text-sm">Truck Apron & Maneuvering Area</span><div class="absolute top-1/2 left-1/4 -translate-y-1/2 text-center"><p class="font-bold text-gray-600">Inbound Docks (D1-D4)</p></div><div class="absolute top-1/2 right-1/4 -translate-y-1/2 text-center"><p class="font-bold text-gray-600">Outbound Docks (D5-D8)</p></div></div>
                        <div data-area="warehouse" class="absolute bg-blue-100 border-t-2 border-gray-400 cursor-pointer" style="top: ${V.topGap + V.docking}%; left: ${H.westBuffer + H.westBlock + H.westFirelane}%; width: ${H.mainBuilding}%; height: ${V.warehouse}%"><div class="absolute center-text text-center"><div class="w-8 h-8 mx-auto mb-2 text-blue-800">${ICONS.Building}</div><span class="text-blue-800 font-bold text-lg">Warehouse</span></div></div>
                        <div data-area="garage" class="absolute bg-gray-100 cursor-pointer" style="top: ${V.westTopGap}%; left: ${H.westBuffer}%; width: ${H.westBlock}%; height: ${V.garage}%"><div class="absolute center-text text-center"><div class="w-6 h-6 mx-auto mb-1 text-gray-700">${ICONS.ParkingCircle}</div><span class="text-gray-700 font-semibold text-xs">Garage</span></div></div>
                        <div data-area="utility" class="absolute bg-yellow-100 cursor-pointer" style="top: ${V.westTopGap + V.garage + V.utilityGap}%; left: ${H.westBuffer}%; width: ${H.westBlock}%; height: ${V.utility}%"><div class="absolute center-text text-center"><div class="w-6 h-6 mx-auto mb-1 text-yellow-800">${ICONS.ShieldCheck}</div><span class="text-yellow-800 font-semibold text-xs">Utility</span></div></div>
                        <div class="absolute bg-orange-100" style="top: 0%; left: ${H.westBuffer + H.westBlock}%; width: ${H.westFirelane}%; height: 100%;"></div><div class="absolute bg-orange-100 rounded-br-lg" style="top: 0%; left: ${H.westBuffer + H.westBlock + H.westFirelane + H.mainBuilding}%; width: ${H.eastFirelane}%; height: calc(100% - ${V.southLane}%);"></div><div class="absolute bg-orange-100" style="top: calc(100% - ${V.southLane}%); left: ${H.westBuffer + H.westBlock}%; width: calc(${H.westFirelane}% + ${H.mainBuilding}% + ${H.eastFirelane}%); height: calc(5/6 * ${V.southLane}%);"></div>
                        <div class="absolute top-0 h-[4%] bg-green-200 border border-green-400 flex items-center justify-center" style="left: calc(12/150*100%); width: calc(8/150*100%);"><span class="text-xs font-bold text-green-800">GATE IN</span></div><div class="absolute top-0 h-[4%] bg-red-200 border border-red-400 flex items-center justify-center" style="right: calc(12/150*100%); width: calc(12/150*100%);"><span class="text-xs font-bold text-red-800">GATE OUT</span></div>
                        ${[...Array(8)].map((_, i) => getDockBayHTML(i)).join('')}
                        <div id="sitemap-dimensions-layer"></div>
                        <div id="sitemap-traffic-layer"></div>
                        <div id="sitemap-details-layer"></div>
                    </div>
                </div>
            </div>`;
    };
    
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action], [data-area]');
        if (!target) return;
        const action = target.dataset.action;
        const area = target.dataset.area;

        if (area) {
            openModal(area);
        } else if (action) {
            switch (action) {
                case 'toggle-dimensions': showDimensions = !showDimensions; updateSitemapLayers(); break;
                case 'toggle-traffic': showTraffic = !showTraffic; updateSitemapLayers(); break;
                case 'toggle-details': showDetails = !showDetails; updateSitemapLayers(); break;
                case 'close-modal': closeModal(); break;
            }
        }
    });
    
    infoModal.addEventListener('click', (e) => { if (e.currentTarget === e.target) closeModal(); });

    // Initial render calls
    renderSidebar();
    renderSitePlan();
    updateSitemapLayers();
});