//Source code generated by AppGPT (www.appgpt.tech)
import { GetListParams } from 'ra-core';
import postgrestRestProvider from '@promitheus/ra-data-postgrest';
import qs from 'qs';

const fieldConfig = {
  Users: [
    {
      field: 'userName',
      datatype: 'String',
    },
    {
      field: 'department',
      datatype: 'Integer',
    },
    {
      field: 'password',
      datatype: 'String',
    },
    {
      field: 'email',
      datatype: 'String',
    },
    {
      field: 'id',
      datatype: 'Integer',
    },
  ],
  Departments: [
    {
      field: 'departmentName',
      datatype: 'String',
    },
    {
      field: 'departmentHead',
      datatype: 'Integer',
    },
    {
      field: 'id',
      datatype: 'Integer',
    },
  ],
  Initiatives: [
    {
      field: 'name',
      datatype: 'String',
    },
    {
      field: 'description',
      datatype: 'String',
    },
    {
      field: 'startDate',
      datatype: 'DateTime',
    },
    {
      field: 'endDate',
      datatype: 'DateTime',
    },
    {
      field: 'relatedDepartment',
      datatype: 'Integer',
    },
    {
      field: 'status',
      datatype: 'String',
    },
    {
      field: 'id',
      datatype: 'Integer',
    },
  ],
  Goals: [
    {
      field: 'name',
      datatype: 'String',
    },
    {
      field: 'description',
      datatype: 'String',
    },
    {
      field: 'targetDate',
      datatype: 'DateTime',
    },
    {
      field: 'relatedDepartment',
      datatype: 'Integer',
    },
    {
      field: 'status',
      datatype: 'String',
    },
    {
      field: 'id',
      datatype: 'Integer',
    },
  ],
  EmissionSources: [
    {
      field: 'sourceType',
      datatype: 'String',
    },
    {
      field: 'quantityUsed',
      datatype: 'Real',
    },
    {
      field: 'emissionFactors',
      datatype: 'Real',
    },
    {
      field: 'totalEmissions',
      datatype: 'Real',
    },
    {
      field: 'id',
      datatype: 'Integer',
    },
  ],
  ResourceUsage: [
    {
      field: 'resourceType',
      datatype: 'String',
    },
    {
      field: 'quantityConsumed',
      datatype: 'Real',
    },
    {
      field: 'unitOfMeasurement',
      datatype: 'String',
    },
    {
      field: 'periodOfConsumption',
      datatype: 'DateTime',
    },
    {
      field: 'id',
      datatype: 'Integer',
    },
  ],
};

export const customDataProvider = (apiUrl, options = {}) => {
  const baseDataProvider = postgrestRestProvider(apiUrl);
  return {
    ...baseDataProvider,
    getList: async (resource, params) => {
      if (params.filter && params.filter.q) {
        return await GetListQ(resource, params, apiUrl, baseDataProvider);
      } else {
        return baseDataProvider.getList(resource, params);
      }
    },
  };
};

async function GetListQ(
  resource,
  params: Partial<GetListParams> = {},
  apiUrl,
  baseDataProvider,
) {
  const { page, perPage } = params.pagination;
  const { field, order } = params.sort || {};
  const searchText = params.filter.q.toLowerCase();

  let filter = { or: '(id.eq.-1)' }; //return no data if resource has not been configured
  if (fieldConfig[resource]) {
    let searchConditions = fieldConfig[resource].reduce(
      (conditions, { field, datatype }) =>
        conditions +
        (datatype == 'String'
          ? field + '.ilike.%' + searchText + '%,'
          : //Todo: add support for searching other types
            ''),
      '',
    );
    filter = { or: '(' + searchConditions.slice(0, -1) + ')' };
  }
  let query = {
    offset: String((page - 1) * perPage),
    limit: String(perPage),
    // append filters
    ...filter,
  };

  if (field && order) {
    query.order = field + '.' + order.toLowerCase();
  }

  // add header that Content-Range is in returned header
  const options = {
    headers: new Headers({
      Accept: 'application/json',
      Prefer: 'count=exact',
      ...(params.meta?.headers || {}),
      //...useCustomSchema(config.schema, metaSchema, 'GET'),
    }),
  };

  const url = apiUrl + '/' + resource + '?' + qs.stringify(query);
  const response = await fetch(url, options);
  if (!response.ok) {
    const message = 'An error has occured: ' + response.status;
    throw new Error(message);
  }
  if (!response.headers.has('content-range')) {
    throw new Error(
      `The Content-Range header is missing in the HTTP Response. The postgREST data provider expects 
            responses for lists of resources to contain this header with the total number of results to build 
            the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?`,
    );
  }
  const json = await response.json();
  return {
    data: json,
    total: parseInt(response.headers.get('content-range').split('/').pop(), 10),
  };
}
