/* eslint-env jest */

jest.mock('../models', () => ({ getModels: jest.fn() }));

const { getModels } = require('../models');
const customerService = require('../services/customerService');

describe('customerService enabled size options', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uses the canonical labels for known size IDs regardless of stored names', async () => {
    const sizes = [
      { ID: '4b2d23db-96d6-4cef-b6ae-10a97a8ce1cb', NAME: 'S (<50)' },
      { ID: '9d9d84c7-8926-4629-b06f-2cb4d434fc33', NAME: 'L (>200)' },
      { ID: 'd8ce72cf-0228-4293-9699-311eeecb926d', NAME: 'M (50-200)' },
    ];
    const Size = { findAll: jest.fn().mockResolvedValue(sizes) };
    getModels.mockReturnValue({ Size });

    await expect(customerService.listEnabledSizes()).resolves.toEqual([
      { id: sizes[0].ID, label: 'L (>200)' },
      { id: sizes[1].ID, label: 'M (50-200)' },
      { id: sizes[2].ID, label: 'S (<50)' },
    ]);
  });
});
