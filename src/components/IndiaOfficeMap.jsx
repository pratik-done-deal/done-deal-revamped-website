import indiaOfficeMapSvg from '../assets/india-office-map.svg?raw';

export default function IndiaOfficeMap() {
  return (
    <div
      className="loc-map"
      dangerouslySetInnerHTML={{ __html: indiaOfficeMapSvg }}
    />
  );
}
