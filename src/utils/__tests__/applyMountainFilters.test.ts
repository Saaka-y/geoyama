import { applyMountainFilters } from '../applyMountainFilters';


describe('applyMountainFilters', () => {
  const mockMountains = [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [0, 0] },
      properties: {
        title: 'Mt. Fuji',
        routeKey: 'fuji',
        distance: 2,
        courseTime: 5,
        routeName: '', elevation: 0, summit: 0, carPark: '', station: ''
      }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [0, 0] },
      properties: {
        title: 'Mt. Takao',
        routeKey: 'takao',
        distance: 1,
        courseTime: 2,
        routeName: '', elevation: 0, summit: 0, carPark: '', station: ''
      }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [0, 0] },
      properties: {
        title: 'Mt. Kinpu',
        routeKey: 'kinpu',
        distance: 3,
        courseTime: 4.5,
        routeName: '', elevation: 0, summit: 0, carPark: '', station: ''
      }
    }
  ] as import("@/types/mountain").MountainFeature[];

  it('should return all mountains when no filters applied', () => {
    const result = applyMountainFilters({
      distance: '',
      courseTime: '',
      mountains: mockMountains
    });
    expect(result).toHaveLength(3);
  });

  it('should filter by distance', () => {
    const result = applyMountainFilters({
      distance: '2',
      courseTime: '',
      mountains: mockMountains
    });
    expect(result).toHaveLength(2);
    expect(result[0].properties.title).toBe('Mt. Fuji');
    expect(result[1].properties.title).toBe('Mt. Takao');
  });

  it('should filter by courseTime', () => {
    const result = applyMountainFilters({
      distance: '',
      courseTime: '4',
      mountains: mockMountains
    });
    expect(result).toHaveLength(1);
    expect(result[0].properties.title).toBe('Mt. Takao');
  });

  it('should filter by both distance and courseTime', () => {
    const result = applyMountainFilters({
      distance: '2',
      courseTime: '3',
      mountains: mockMountains
    });
    expect(result).toHaveLength(1);
    expect(result[0].properties.title).toBe('Mt. Takao');
  });

  it('should return empty array when no mountains match', () => {
    const result = applyMountainFilters({
      distance: '0.5',
      courseTime: '1',
      mountains: mockMountains
    });
    expect(result).toHaveLength(0);
  });
});
