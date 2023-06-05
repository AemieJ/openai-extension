import React from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Tag.css';

import {
  useLocation
} from "react-router-dom";

import { useState, useEffect } from "react";

function Tag() {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');

    const [summaries, setSummaries] = useState<any[]>([]);

    const card = (summary: string, link: string, priority: number) => {
      return <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 10 }} gutterBottom>
            {id!.charAt(0).toUpperCase() + id!.slice(1)}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 14, fontWeight: 500 }} color="text.secondary">
            {summary}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#734f96" }} color="text.secondary">
                      <strong>Priority</strong>: {priority}
         </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" sx={{ textTransform: "none !important" }}
          onClick={() => window.open(link, "_blank")}
          >Link: {link}</Button>
        </CardActions>
      </React.Fragment>
    };

    const getSummaryByTags = () => {
        axios
          .get("http://localhost:8080/text/")
          .then(function (response) {
            if (response.status === 200) {
                let results: any[] = []

                    response.data.forEach((res: any) => {
                        if (res.tags.includes(id)) {
                          results.push(res);
                        }
                    })

                    results = results.sort((res1 : any, res2: any) => {
                        return res1.priority >= res2.priority ? -1 : 1;
              });

                setSummaries(results);
            }
          });
    }

    useEffect(() => {
        getSummaryByTags();
      });

    return (
        <div className="Tag">
            <div className="main">
                   <h3> List Of Summaries for tag - {id} </h3>
            </div>
            <ul>{
              summaries.map((summary, key) => {
                         return <Card variant="outlined" className="card">{card(summary["summary"],
                         summary["link"], summary["priority"])}</Card>
                      })
            }</ul>
        </div>
    )
}

export default Tag;