import sys
import PyQt6.QtWidgets as qtw
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtCore import QUrl

class MainWindow(qtw.QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Snow Ball Scrapper")
     
        self.setGeometry(750, 450, 1600, 900)

    
        central_widget = qtw.QWidget()

        self.setCentralWidget(central_widget)
        layout = qtw.QVBoxLayout()
        central_widget.setLayout(layout)
        self.setCentralWidget(central_widget)

        # Text input field
        textInput = qtw.QLineEdit()
        textInput.setObjectName("Name_field")
        textInput.setPlaceholderText("Enter something to start snowballing ")
        textInput.setText("")
        
        # Web Viewer
        self.view = QWebEngineView()
        # self.view.setUrl(QUrl("https://www.bing.com/search?q=home"))  # Set a default initial URL
        
        button= qtw.QPushButton("Click To Snowball", clicked=lambda: press_it())

        def press_it():
            print(textInput.text())
            url = f"https://www.bing.com/search?q={ textInput.text()}"
            textInput.setText("")
            print(url)
            self.view.setUrl(QUrl(url))
            self.view.page().toHtml(handle_html)
        
        def handle_html(html):
            print(html)




        
        layout.addWidget(self.view)
        layout.addWidget(textInput)
        layout.addWidget(button)


    

    

        self.show()

if __name__ == "__main__":
    app = qtw.QApplication(sys.argv)
    window =MainWindow()
    sys.exit(app.exec())