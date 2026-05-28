import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    const { searchParams } = new URL(request.url);
    const province = searchParams.get('province');

    if (type === 'boundary') {
      let query: string;
      let queryParams: string[];

      if (province) {
        // Return single province feature for zoom/fitBounds
        query = `
          SELECT json_build_object(
            'type', 'FeatureCollection',
            'features', json_agg(
              json_build_object(
                'type', 'Feature',
                'geometry', ST_AsGeoJSON(geom)::json,
                'properties', to_jsonb(t.*) - 'geom'
              )
            )
          ) AS geojson
          FROM province_boundaries AS t
          WHERE prov_nam_t = $1;
        `;
        queryParams = [province];
      } else {
        // Return all provinces
        query = `
          SELECT json_build_object(
            'type', 'FeatureCollection',
            'features', json_agg(
              json_build_object(
                'type', 'Feature',
                'geometry', ST_AsGeoJSON(geom)::json,
                'properties', to_jsonb(t.*) - 'geom'
              )
            )
          ) AS geojson
          FROM province_boundaries AS t;
        `;
        queryParams = [];
      }

      const { rows } = await pool.query(query, queryParams);
      if (!rows || rows.length === 0 || !rows[0].geojson) {
        return NextResponse.json({ type: 'FeatureCollection', features: [] });
      }
      if (!rows[0].geojson.features) {
        rows[0].geojson.features = [];
      }
      return NextResponse.json(rows[0].geojson);

    } else if (type === 'districts') {
      const query = `
        SELECT json_build_object(
          'type', 'FeatureCollection',
          'features', json_agg(
            json_build_object(
              'type', 'Feature',
              'geometry', ST_AsGeoJSON(geom)::json,
              'properties', to_jsonb(t.*) - 'geom'
            )
          )
        ) AS geojson
        FROM districts AS t;
      `;
      const { rows } = await pool.query(query);
      if (!rows || rows.length === 0 || !rows[0].geojson) {
        return NextResponse.json({ type: 'FeatureCollection', features: [] });
      }
      if (!rows[0].geojson.features) {
        rows[0].geojson.features = [];
      }
      return NextResponse.json(rows[0].geojson);

    } else {
      return NextResponse.json({ error: 'Invalid geojson type requested' }, { status: 400 });
    }
  } catch (error) {
    console.error(`Failed to fetch geojson:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
