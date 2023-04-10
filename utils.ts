import { find, groupBy, sortBy, uniq } from "lodash";

export function getFeaturesFromResponse(res: any) {
  return res.data.frames[0].columns.map((col: any) => col.label);
}

export function getPDPfromResponse(res: any) {
  return res.data.partial_dependence_data.map((obj: any) => {
    const { data, columns } = obj;
    const columnsnames = columns.map((col: any) => ({
      name: col.name,
      type: col.type,
    }));
    const resdata = [];
    for (let i = 0; i < obj.rowcount; i++) {
      resdata.push({
        [columnsnames[0].name]: data[0][i],
        [columnsnames[1].name]: data[1][i],
        [columnsnames[2].name]: data[2][i],
        [columnsnames[3].name]: data[3][i],
      });
    }
    return {
      columns: columnsnames,
      name: columnsnames[0].name,
      type: columnsnames[0].type,
      data: resdata,
    };
  });
}

export function getVIfromResponse(res: any) {
  const obj = res.data.models[0].output.variable_importances;
  const { data } = obj;
  const resdata = [];
  for (let i = 0; i < obj.rowcount; i++) {
    resdata.push({
      name: data[0][i],
      value: data[2][i],
    });
  }

  return {
    data: resdata,
  };
}

export function getShapFromResponse(res: any, testdata: any) {
  const arr: any = [];
  const resbyname: any = {};
  const testbyname: any = {};
  res.data.frames[0].columns.forEach((col: any) => {
    resbyname[col.label] = col;
  });
  testdata.data.frames[0].columns.forEach((col: any) => {
    testbyname[col.label] = col;
  });
  console.log(Object.keys(testbyname), Object.keys(resbyname));
  Object.keys(resbyname).forEach((key: any) => {
    console.log(key, testbyname[key], resbyname[key]);
    if (!testbyname[key]) return;
    resbyname[key].data.map((point: any, ind: any) => {
      arr.push({
        name: key,
        value: point,
        sigma: resbyname[key].sigma,
        xval: (
          (testbyname[key]["data"][ind] - testbyname[key].mins[0]) /
          testbyname[key].maxs[0]
        ).toFixed(1),
      });
    });
  });
  return sortBy(arr, (obj) => 5 - obj.sigma);
  /*
  res.data.frames[0].columns.forEach((col: any) => {
    col.data.forEach((point: any) => {
      arr.push({
        name: col.label,
        value: point,
        mean: col.sigma,
      });
    });
  });
  
 */
}

export function getTestDataFromReponse(res: any) {
  const rows: any = [];
  const cols: any = [];
  res.data.frames[0].columns.forEach((col: any, ind: any) => {
    cols.push(col.label);
    if (ind !== 0)
      col.data.forEach((point: any, ind: any) => {
        if (!rows[ind]) rows[ind] = {};
        rows[ind][col.label] = point;
      });
  });
  return {
    columns: cols,
    rows,
  };
}

export function getInfogramData(res: any) {
  const rows: any = [];
  res.data.frames[0].columns.forEach((col: any, ind: any) => {
    if (col.data == null)
      rows.push({ data: col.string_data, label: col.label });
    else rows.push({ data: col.data, label: col.label });
  });
  return {
    rows,
  };
}

export function getIceDataFromResponse(res: any) {
  const row_idCol = find(res.data.frames[0].columns, { label: "row_id" });
  const mean_responseCol = find(res.data.frames[0].columns, {
    label: "mean_response",
  });
  const simulated_x_valueCol = find(res.data.frames[0].columns, {
    label: "simulated_x_value",
  });
  const finalData: any = [];
  const obj: any = {};
  simulated_x_valueCol.data.forEach((xval: any, ind: any) => {
    if (!obj[xval]) obj[xval] = [];
    obj[xval].push({
      row_id: row_idCol.data[ind],
      mean_response: mean_responseCol.data[ind],
    });
  });
  Object.keys(obj).map((key: any) => {
    let tmp: any = { xval: +key };
    obj[key].map((val: any) => {
      tmp[val.row_id] = val.mean_response.toFixed(2);
    });
    finalData.push(tmp);
  });
  return {
    values: finalData,
    domain: simulated_x_valueCol.domain,
  };
}
