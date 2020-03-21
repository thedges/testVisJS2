import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import VISJS from '@salesforce/resourceUrl/VisJS740';

export default class TestVisJS2 extends LightningElement {
    visjsInitialized = false;

    renderedCallback() {
        if (this.visjsInitialized) {
            return;
        }

        this.visjsInitialized = true;
        Promise.all([
            loadScript(this, VISJS + '/vis-network.min.js')
        ])
            .then(() => {
                this.initializeNetwork();
            })
            .catch(error => {
                console.log('error=' + JSON.stringify(error));
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading VisJS',
                        message: JSON.stringify(error),
                        //.body.message,
                        variant: 'error',
                    }),
                );
            });
    }

    initializeNetwork() {
        console.log('initializeNetwork...');
        try
        {
        var nodes = new vis.DataSet([
            {id: 1, label: 'Node 1'},
            {id: 2, label: 'Node 2'},
            {id: 3, label: 'Node 3'},
            {id: 4, label: 'Node 4'},
            {id: 5, label: 'Node 5'}
          ]);
        
          // create an array with edges
          var edges = new vis.DataSet([
            {from: 1, to: 3},
            {from: 1, to: 2},
            {from: 2, to: 4},
            {from: 2, to: 5},
            {from: 3, to: 3}
          ]);
        
          // create a network
          var container = this.template.querySelector('.mynetwork');
          //var container = this.template.querySelector ('.mynetwork').getContext ('2d');
          var data = {
            nodes: nodes,
            edges: edges
          };
          var options = {};

          console.log('createNetwork...');
          var network = new vis.Network(container, data, options);
          console.log('networkDone...');
        }

        catch (err)
        {
            console.log('error=' + err.message);
        }
    }
}