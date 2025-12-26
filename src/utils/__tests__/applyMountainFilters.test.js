import { applyMountainFilters } from '../applyMountainFilters';

describe('applyMountainFilters', () => {
  const mockMountains = [
    {
      properties: {
        title: 'Mt. Fuji',
        distance: 2,
        courseTime: 5,
      }
    },
    {
      properties: {
        title: 'Mt. Takao',
        distance: 1,
        courseTime: 2,
      }
    },
    {
      properties: {
        title: 'Mt. Kinpu',
        distance: 3,
        courseTime: 4.5,
      }
    }
  ];

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
      distance: 2,
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
      courseTime: 4,
      mountains: mockMountains
    });
    expect(result).toHaveLength(1);
    expect(result[0].properties.title).toBe('Mt. Takao');
  });

  it('should filter by both distance and courseTime', () => {
    const result = applyMountainFilters({
      distance: 2,
      courseTime: 3,
      mountains: mockMountains
    });
    expect(result).toHaveLength(1);
    expect(result[0].properties.title).toBe('Mt. Takao');
  });

  it('should return empty array when no mountains match', () => {
    const result = applyMountainFilters({
      distance: 0.5,
      courseTime: 1,
      mountains: mockMountains
    });
    expect(result).toHaveLength(0);
  });
});
