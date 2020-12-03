export class Geomap {
  constructor(
    public address_components: {
      long_name: string,
      short_name: string
    }[] = [],
    public formatted_address: string,
    public geometry: {
      bounds: {
        northeast: {
          lat: number,
          lng: number
        },
        southwest: {
          lat: number,
          lng: number
        }
      },
      location: {
        lat: number,
        lng: number
      },
      location_type: string,
      viewport: {
        northeast: {
          lat: number,
          lng: number
        },
        southwest: {
          lat: number,
          lng: number
        }
      },
    },
    public partial_match: boolean,
    public place_id: string,
    public types: string[]
  ) { }

}
