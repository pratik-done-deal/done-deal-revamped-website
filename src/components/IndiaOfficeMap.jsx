import indiaOfficeMapSvg from '../assets/india-office-map.svg?raw';

export default function IndiaOfficeMap({ activeOffice, onOfficeActive }) {
  const svgMarkup = activeOffice
    ? indiaOfficeMapSvg.replace(
      `class="map-pin" id="map-${activeOffice}"`,
      `class="map-pin active" id="map-${activeOffice}"`
    )
    : indiaOfficeMapSvg;

  const setActiveFromEvent = (event) => {
    const pin = event.target.closest?.('.map-pin');
    if (!pin) return;
    onOfficeActive?.(pin.dataset.loc || null);
  };

  const clearActiveFromEvent = (event) => {
    const pin = event.target.closest?.('.map-pin');
    if (!pin) return;
    if (pin.contains(event.relatedTarget)) return;
    onOfficeActive?.(null);
  };

  return (
    <div
      className="loc-map"
      onMouseOver={setActiveFromEvent}
      onMouseOut={clearActiveFromEvent}
      onFocus={setActiveFromEvent}
      onBlur={clearActiveFromEvent}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
