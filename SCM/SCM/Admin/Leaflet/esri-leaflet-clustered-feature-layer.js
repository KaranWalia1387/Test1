/* esri-leaflet-clustered-feature-layer - v2.0.0-beta.1 - Mon Dec 28 2015 12:45:35 GMT-0800 (PST)
 * Copyright (c) 2015 Environmental Systems Research Institute,   Inc.
 * Apache-2.0 */
(function(global,factory){typeof exports==="object"&&typeof module!=="undefined"?factory(exports,require("leaflet"),require("esri-leaflet")):typeof define==="function"&&define.amd?define(["exports","leaflet","esri-leaflet"],factory):factory(global.L.esri.Cluster={},L,L.esri)})(this,function(exports,L,esri_leaflet){"use strict";exports.VERSION="2.0.0-beta.1";exports.ClusteredFeatureLayer=esri_leaflet.FeatureManager.extend({statics:{EVENTS:"click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose",CLUSTEREVENTS:"clusterclick clusterdblclick clustermouseover clustermouseout clustermousemove clustercontextmenu"},initialize:function(options){esri_leaflet.FeatureManager.prototype.initialize.call(this,options);options=L.setOptions(this,options);this._layers={};this._leafletIds={};this.cluster=L.markerClusterGroup(options);this._key="c"+(Math.random()*1e9).toString(36).replace(".","_");this.cluster.addEventParent(this)},onAdd:function(map){esri_leaflet.FeatureManager.prototype.onAdd.call(this,map);this._map.addLayer(this.cluster)},onRemove:function(map){esri_leaflet.FeatureManager.prototype.onRemove.call(this,map);this._map.removeLayer(this.cluster)},createLayers:function(features){var markers=[];for(var i=features.length-1;i>=0;i--){var geojson=features[i];var layer=this._layers[geojson.id];if(!layer){var newLayer=L.GeoJSON.geometryToLayer(geojson,this.options);newLayer.feature=L.GeoJSON.asFeature(geojson);newLayer.defaultOptions=newLayer.options;newLayer._leaflet_id=this._key+"_"+geojson.id;this.resetStyle(newLayer.feature.id);if(this._popup&&newLayer.bindPopup){newLayer.bindPopup(this._popup(newLayer.feature,newLayer))}this._layers[newLayer.feature.id]=newLayer;this._leafletIds[newLayer._leaflet_id]=geojson.id;if(this.options.onEachFeature){this.options.onEachFeature(newLayer.feature,newLayer)}this.fire("createfeature",{feature:newLayer.feature});if(!this.options.timeField||this.options.timeField&&this._featureWithinTimeRange(geojson)){markers.push(newLayer)}}}if(markers.length){this.cluster.addLayers(markers)}},addLayers:function(ids){var layersToAdd=[];for(var i=ids.length-1;i>=0;i--){var layer=this._layers[ids[i]];this.fire("addfeature",{feature:layer.feature});layersToAdd.push(layer)}this.cluster.addLayers(layersToAdd)},removeLayers:function(ids,permanent){var layersToRemove=[];for(var i=ids.length-1;i>=0;i--){var id=ids[i];var layer=this._layers[id];this.fire("removefeature",{feature:layer.feature,permanent:permanent});layersToRemove.push(layer);if(this._layers[id]&&permanent){delete this._layers[id]}}this.cluster.removeLayers(layersToRemove)},resetStyle:function(id){var layer=this._layers[id];if(layer){layer.options=layer.defaultOptions;this.setFeatureStyle(layer.feature.id,this.options.style)}return this},setStyle:function(style){this.eachFeature(function(layer){this.setFeatureStyle(layer.feature.id,style)},this);return this},setFeatureStyle:function(id,style){var layer=this._layers[id];if(typeof style==="function"){style=style(layer.feature)}if(layer.setStyle){layer.setStyle(style)}},bindPopup:function(fn,options){this._popup=fn;for(var i in this._layers){var layer=this._layers[i];var popupContent=this._popup(layer.feature,layer);layer.bindPopup(popupContent,options)}},unbindPopup:function(){this._popup=false;for(var i in this._layers){this._layers[i].unbindPopup()}},eachFeature:function(fn,context){for(var i in this._layers){fn.call(context,this._layers[i])}return this},getFeature:function(id){return this._layers[id]}});function clusteredFeatureLayer(options){return new exports.ClusteredFeatureLayer(options)}var _ClusteredFeatureLayer=clusteredFeatureLayer;exports.clusteredFeatureLayer=clusteredFeatureLayer;exports.default=_ClusteredFeatureLayer});
//# sourceMappingURL=./esri-leaflet-clustered-feature-layer.js.map

