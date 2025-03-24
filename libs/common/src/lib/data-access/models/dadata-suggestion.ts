type Data = {
  postal_code: string;
  country: string;
  country_iso_code: string;
  federal_district: string;
  region_fias_id: string;
  region_kladr_id: string;
  region_iso_code: string;
  region_with_type: string;
  region_type: string;
  region_type_full: string;
  region: string;
  city_fias_id: string;
  city_kladr_id: string;
  city_with_type: string;
  city_type: string;
  city_type_full: string;
  city: string;
  fias_id: string;
  fias_level: string;
  fias_actuality_state: string;
  kladr_id: string;
  geoname_id: string;
  capital_marker: string;
  okato: string;
  oktmo: string;
  tax_office: string;
  tax_office_legal: string;
  geo_lat: string;
  geo_lon: string;
  qc_geo: string;
};

export type DadataSuggestion = {
  value: string;
  unrestricted_value: string;
  data: Data;
};
