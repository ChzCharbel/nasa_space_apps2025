def get_dataset_objects():
    datasets = [
        {
            "title": "Kepler Objects of Interest",
            "description": """
                KOIs are well vetted, periodic, transit-like 
                events in the Kepler data. The Kepler Project 
                identifies these objects from the TCE list for 
                further vetting. Some objects will be flagged 
                as false positives..
            """,
            "img": ""
        },
        {
            "title": "K2 Planets y Candidates",
            "description": """
                The TESS Project Candidates table contains a 
                list of TESS Objects of Interest (TOI), as identified 
                by the TESS Project, consisting primarily of planetary 
                candidates identified by TESS, but also containing 
                previously known transiting planets and false 
                positives detected by TESS.
            """,
            "img": ""
        },
    ]

    return datasets