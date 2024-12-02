import PyQt6.QtWidgets as qtw
import PyQt6.QtGui as qtg
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtCore import QUrl
from pprint import pprint
import sys

class MainWindow(qtw.QWidget):
    def __init__(self):
        super().__init__()
        # Set title
        self.setWindowTitle("PyQT")

        # Layout
        self.setLayout(qtw.QVBoxLayout())

        my_label = qtw.QLabel("HELLO WORLD WHATS UP!!!!")
        my_label.setFont(qtg.QFont("Helvetica", 23))
        self.layout().addWidget(my_label)

        my_entry = qtw.QLineEdit()
        my_entry.setObjectName("Name_field")
        my_entry.setText("")
        self.layout().addWidget(my_entry)

        def press_it():
            my_label.setText(f'Hello {my_entry.text()}')
            my_entry.setText("")
        my_button = qtw.QPushButton("HIT ME BITCH!!!", clicked=lambda: press_it())
        self.layout().addWidget(my_button)

        # Initialize QWebEngineView with an initial URL
        self.view = QWebEngineView()
        self.view.setUrl(QUrl("https://www.bing.com/search?q=home"))  # Set a default initial URL
        self.layout().addWidget(self.view)  # Add the web view to the layout

        def search():
            url = f"https://www.bing.com/search?q={my_entry.text()}"
            self.view.setUrl(QUrl(url))
            print()
            print(url)
            print()
        search_button = qtw.QPushButton("Search!!!", clicked=lambda: search())
        self.layout().addWidget(search_button)

        # Button to fetch and save HTML
        fetch_html_button = qtw.QPushButton("Save HTML", clicked=lambda: self.fetch_html())
        self.layout().addWidget(fetch_html_button)

        self.show()

    def fetch_html(self):
        def handle_html(html):
            # Save HTML to a file
            pprint(html)
            file_path = "output.html"
            try:
                with open(file_path, "w", encoding="utf-8") as file:
                    file.write(html)
                print(f"HTML saved to {file_path}")
            except Exception as e:
                print(f"Failed to save HTML: {e}")

        self.view.page().toHtml(handle_html)

if __name__ == "__main__":
    app = qtw.QApplication(sys.argv)  # Pass sys.argv as command-line arguments
    mw = MainWindow()
    sys.exit(app.exec())
